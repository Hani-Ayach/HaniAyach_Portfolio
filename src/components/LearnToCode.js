import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import SectionWrapper from "./SectionWrapper";

const initialHTML = `
<h1 style="color: royalblue;">Hello Visitor!</h1>
<p>Welcome to my portfolio. Try editing this text.</p>
<button style="background-color: hotpink;">Click Me</button>
`;

const LearnToCode = () => {
  const [htmlCode, setHtmlCode] = useState(initialHTML);

  const resetCode = () => setHtmlCode(initialHTML);

  return (
    <SectionWrapper background="bg-dark">
      <div className="container text-white py-5">
        <h2 className="text-center mb-4">HTML & CSS Live Editor</h2>

        <div className="alert alert-info text-dark">
          🧠 Try This: Change the button color or write your name in the
          heading!
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Code Editor</h5>
              <button
                className="btn btn-sm btn-outline-warning"
                onClick={resetCode}
              >
                Reset Code
              </button>
            </div>
            <CodeMirror
              value={htmlCode}
              height="300px"
              theme="dark"
              extensions={[html()]}
              onChange={(value) => setHtmlCode(value)}
            />
          </div>

          <div className="col-md-6">
            <h5>Live Preview</h5>
            <div
              className="p-3 border rounded bg-black"
              style={{ minHeight: "300px" }}
              dangerouslySetInnerHTML={{ __html: htmlCode }}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LearnToCode;
