import "../blocky";
import { useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import { toolboxCategories } from "./toolboxCategories";

export default function BlockyMain({ setHtml }: { setHtml: Function }) {
  const [xml, setXml] = useState("");
  const [javascriptCode, setJavascriptCode] = useState("");

  const initialXml = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';

  function workspaceDidChange(workspace: any) {
    const code = (Blockly as any).JavaScript.workspaceToCode(workspace);
    setJavascriptCode(code);
    setHtml(code);
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
      {/* <textarea
        id="code"
        style={{ height: "200px", width: "400px" }}
        value={javascriptCode}
        readOnly
      ></textarea> */}
    </>
  );
}
