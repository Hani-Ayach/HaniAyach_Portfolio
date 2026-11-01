// Architecture approaches and design patterns Hani confirmed using in production.
// Code samples are generic and illustrative: no company code, no company names.

export const architecture = {
  intro:
    "Frameworks change from job to job; structure is what keeps a system easy to change. These are the approaches I use in production, each with the problem it solves and a simplified example.",

  cleanArchitectureDiagram: `flowchart LR
  API[API / Presentation<br/>controllers, DTOs] --> APP[Application<br/>use cases, CQRS handlers,<br/>interfaces]
  INF[Infrastructure<br/>EF Core, repositories,<br/>external services] --> APP
  APP --> DOM[Domain<br/>entities, business rules]
  INF -.implements.-> APP`,

  rules: [
    "Dependencies point inward: the Domain depends on nothing.",
    "The Application layer defines interfaces; Infrastructure implements them.",
    "Business rules live in the Domain, not in controllers or the database.",
    "Swapping a database, an external system or the UI doesn't touch the core.",
  ],

  patterns: [
    {
      slug: "clean-architecture",
      name: "Clean Architecture",
      problem: "Business logic spread across controllers and data access makes every change risky.",
      useCase:
        "I structure solutions as Domain, Application, Infrastructure and API projects. Business rules stay in the Domain, use cases in the Application layer, and EF Core and external systems sit behind interfaces in Infrastructure.",
      code: `// Application layer: owns the contract
public interface IRequestRepository
{
    Task<Request?> GetByIdAsync(Guid id, CancellationToken ct);
    void Add(Request request);
}

// Infrastructure layer: implements it with EF Core
public sealed class RequestRepository(AppDbContext db) : IRequestRepository
{
    public Task<Request?> GetByIdAsync(Guid id, CancellationToken ct) =>
        db.Requests.FirstOrDefaultAsync(r => r.Id == id, ct);

    public void Add(Request request) => db.Requests.Add(request);
}

// API layer wires it up; the core never references EF Core
builder.Services.AddScoped<IRequestRepository, RequestRepository>();`,
    },
    {
      slug: "cqrs-mediatr",
      name: "CQRS + MediatR",
      problem: "Large services mixing reads and writes become hard to test and to change safely.",
      useCase:
        "Each business operation is a command or a query with its own handler, sent through MediatR. Controllers stay thin and every use case can be tested on its own.",
      code: `public sealed record ApproveRequestCommand(Guid RequestId, string ApprovedBy) : IRequest<Result>;

public sealed class ApproveRequestHandler(IRequestRepository requests, IUnitOfWork uow)
    : IRequestHandler<ApproveRequestCommand, Result>
{
    public async Task<Result> Handle(ApproveRequestCommand cmd, CancellationToken ct)
    {
        var request = await requests.GetByIdAsync(cmd.RequestId, ct);
        if (request is null) return Result.NotFound();

        request.Approve(cmd.ApprovedBy);   // the business rule lives in the Domain
        await uow.SaveChangesAsync(ct);    // one transaction
        return Result.Ok();
    }
}

// Controller: one line per use case
[HttpPost("{id}/approve")]
public Task<Result> Approve(Guid id, ApproveDto dto, ISender sender) =>
    sender.Send(new ApproveRequestCommand(id, dto.ApprovedBy));`,
    },
    {
      slug: "repository-unit-of-work",
      name: "Repository + Unit of Work",
      problem: "Data access scattered across the code, and several changes that must succeed or fail together.",
      useCase:
        "Repositories give the Application layer a clean way to load and add aggregates; the Unit of Work commits all changes of a use case in a single transaction.",
      code: `public interface IUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken ct);
}

// EF Core's DbContext already tracks changes, so the Unit of Work is thin
public sealed class UnitOfWork(AppDbContext db) : IUnitOfWork
{
    public Task<int> SaveChangesAsync(CancellationToken ct) => db.SaveChangesAsync(ct);
}

// In a handler: several repositories, one commit
requests.Add(request);
attachments.Add(attachment);
await uow.SaveChangesAsync(ct);   // both saved, or neither`,
    },
    {
      slug: "driver-registry-factory",
      name: "Driver + Registry + Factory",
      problem:
        "A growing switch statement that picks behavior by type: every new case means editing code that already works.",
      useCase:
        "Each behavior is a driver: a class implementing one injected interface. All drivers are registered in DI and collected into a registry keyed by a value, and a factory returns the one needed at runtime. Adding a behavior means one new class and one registration; nothing existing changes (open/closed principle).",
      code: `public interface INotificationDriver
{
    string Key { get; }   // e.g. "email", "sms"
    Task SendAsync(Notification notification, CancellationToken ct);
}

public sealed class EmailDriver : INotificationDriver { public string Key => "email"; /* ... */ }
public sealed class SmsDriver   : INotificationDriver { public string Key => "sms";   /* ... */ }

// Registry: every registered driver, keyed by its value
public sealed class DriverRegistry(IEnumerable<INotificationDriver> drivers)
{
    private readonly Dictionary<string, INotificationDriver> _byKey =
        drivers.ToDictionary(d => d.Key, StringComparer.OrdinalIgnoreCase);

    public bool TryGet(string key, out INotificationDriver driver) =>
        _byKey.TryGetValue(key, out driver!);
}

// Factory: hands back the driver for a value
public sealed class DriverFactory(DriverRegistry registry)
{
    public INotificationDriver Create(string key) =>
        registry.TryGet(key, out var driver)
            ? driver
            : throw new NotSupportedException($"No driver registered for '{key}'.");
}

// Adding a new channel = one class + one line here
builder.Services.AddScoped<INotificationDriver, EmailDriver>();
builder.Services.AddScoped<INotificationDriver, SmsDriver>();
builder.Services.AddScoped<DriverRegistry>();
builder.Services.AddScoped<DriverFactory>();`,
    },
    {
      slug: "facade",
      name: "Facade",
      problem: "One business operation needs several services and repositories, and every caller had to coordinate them.",
      useCase:
        "A facade puts one service in front of a complex subsystem: callers make a single call, and the facade coordinates the repositories and services behind it.",
      code: `public sealed class SubmissionFacade(
    IRequestRepository requests,
    IAttachmentStore attachments,
    IApprovalRouter router,
    DriverFactory notifications,
    IUnitOfWork uow)
{
    public async Task<Guid> SubmitAsync(SubmitRequestDto dto, CancellationToken ct)
    {
        var request = Request.Create(dto.Title, dto.SubmittedBy);
        requests.Add(request);
        await attachments.SaveAsync(request.Id, dto.Files, ct);

        var approver = await router.NextApproverAsync(request, ct);
        await uow.SaveChangesAsync(ct);

        await notifications.Create(approver.PreferredChannel)
            .SendAsync(Notification.ApprovalNeeded(approver, request), ct);
        return request.Id;
    }
}

// The caller sees one method instead of five collaborators
var id = await submission.SubmitAsync(dto, ct);`,
    },
  ],
};
