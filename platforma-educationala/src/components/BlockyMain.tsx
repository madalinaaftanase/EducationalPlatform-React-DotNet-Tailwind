import "./App.css";
import "./blocky/CustomBlock"
import "./blocky/html/BaseFrame"
import { useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";

export default function BlockyMain() {
  const [xml, setXml] = useState("");
  const [javascriptCode, setJavascriptCode] = useState("");

  const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';
    
  const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [ 
      {
        kind: "category",
        name: "Base Frame",
        colour: "#FFC0CB",
        contents: [
          {
            kind: "block",
            type: "document",
          }, 
          {
            kind: "block",
            type: "header",
          },
          {
            kind: "block",
            type: "content",
          }, 
        ],
      },
      {
        kind: "category",
        name: "Div",
        colour: "#5CA699",
        contents: [ 
          {
            kind: "block",
            type: "div",
          }, 
        ],
      },
      {
        kind: "category",
        name: "text",
        colour: "#7FFF00",
        contents: [ 
          {
            kind: "block",
            type: "regexInput",
          }, 
        ],
      },
    ],
  };

  function workspaceDidChange(workspace: any) {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    setJavascriptCode(code);
  }

  return (
    <>
      <BlocklyWorkspace
        toolboxConfiguration={toolboxCategories as any}
        initialXml={initialXml}
        className="fill-height"
        workspaceConfiguration={{
          grid: {
            spacing: 20,
            length: 3,
            colour: "#ccc",
            snap: true,
          },
        }}
        onWorkspaceChange={workspaceDidChange}
        onXmlChange={setXml}
      />
       <textarea
        id="code"
        style={{ height: "200px", width: "400px" }}
        value={javascriptCode}
        readOnly
      ></textarea>
    </>
  );
}
