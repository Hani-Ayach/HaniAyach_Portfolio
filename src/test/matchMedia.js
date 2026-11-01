// jsdom has no matchMedia; tests call this to pick which media queries match.
export function mockMatchMedia(matching = []) {
  window.matchMedia = (query) => ({
    matches: matching.some((m) => query.includes(m)),
    media: query,
    addEventListener() {},
    removeEventListener() {},
  });
}
