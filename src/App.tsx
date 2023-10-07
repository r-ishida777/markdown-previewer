import { useState } from "react";
import "./App.css";
import { marked } from "marked";
import { initialText } from "./InitialText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons";
import {
  faDownLeftAndUpRightToCenter,
  faExpandArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";
import createDOMPurify from "dompurify";

function App() {
  const [markedText, setMarkedText] = useState<string>(initialText);
  const [editorMax, setEditorMax] = useState<boolean>(false);
  const [previewMax, setPreviewMax] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkedText(e.target.value);
  };
  const rawMarkup = (markup: string) => {
    const DOMPurify = createDOMPurify(window as unknown as Window);
    const rawMarkup = DOMPurify.sanitize(marked(markup));
    return { __html: rawMarkup };
  };
  return (
    <>
      <div
        className="editorWrapper"
        style={previewMax ? { display: "none" } : {}}
      >
        <div className="toolbar">
          <FontAwesomeIcon icon={faFreeCodeCamp} />
          Editor
          {editorMax ? (
            <FontAwesomeIcon
              icon={faDownLeftAndUpRightToCenter}
              onClick={() => setEditorMax(false)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faExpandArrowsAlt}
              onClick={() => setEditorMax(true)}
            />
          )}
        </div>
        <textarea
          id="editor"
          onChange={(e) => handleChange(e)}
          style={editorMax ? { minHeight: "85vh" } : {}}
        >
          {markedText}
        </textarea>
      </div>
      <div
        className="previewWrapper"
        style={editorMax ? { display: "none" } : {}}
      >
        <div className="toolbar">
          <FontAwesomeIcon icon={faFreeCodeCamp} />
          Preview
          {previewMax ? (
            <FontAwesomeIcon
              icon={faDownLeftAndUpRightToCenter}
              onClick={() => setPreviewMax(false)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faExpandArrowsAlt}
              onClick={() => setPreviewMax(true)}
            />
          )}
        </div>
        <div id="preview">
          <span dangerouslySetInnerHTML={rawMarkup(markedText)}></span>
        </div>
      </div>
    </>
  );
}

export default App;
