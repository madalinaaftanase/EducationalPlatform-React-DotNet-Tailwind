import "../blocky";
import { useEffect, useRef, useState } from "react";
import { useBlocklyWorkspace } from "react-blockly";
import Blockly, { WorkspaceSvg } from "blockly";
import { toolboxCategories } from "./toolboxCategories";

interface BlockyMainInterface {
  setHtml: Function;
  xmlFromDb?: string;
  setXml: Function;
}

export default function BlockyMain({ setHtml, xmlFromDb, setXml }: BlockyMainInterface) {
  const blocklyRef = useRef(null);
  const initialXml = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';

  function workspaceDidChange(workspace: WorkspaceSvg) {
    const code = (Blockly as any).JavaScript.workspaceToCode(workspace);
    if (workspace.getAllBlocks(true).length > 0) {
      workspace.scrollbar.setContainerVisible(true);
    } else {
      workspace.scrollbar.setContainerVisible(false);
    }
    setHtml(code);
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToText(xml);
    setXml(xmlText);
  }

  const { workspace } = useBlocklyWorkspace({
    ref: blocklyRef,
    toolboxConfiguration: toolboxCategories as any,
    initialXml: xmlFromDb ?? initialXml,
    workspaceConfiguration: {
      grid: {
        spacing: 20,
        length: 3,
        colour: "#ccc",
        snap: true,
      },
      css: true,
    },
    onWorkspaceChange: workspaceDidChange,
    onImportXmlError: () => console.log("eroare xml import"),
    onInject: () => console.log("creating workspace"),
    onDispose: () => console.log("deleting workspace"),
  });

  workspace?.addChangeListener((event: any) => {
    if (event.type === "drag" || event.type === "selected") {
      localStorage.setItem("isDragInProgress", "true");
    } else if (event.type === "move") {
      localStorage.setItem("isDragInProgress", "false");
    }
  });

  useEffect(() => {
    if (!workspace) return;
    workspace.scrollbar.setContainerVisible(false);
  }, [workspace]);

  useEffect(() => {
    if (!blocklyRef.current) return;
    (document.getElementsByClassName("injectionDiv")[0] as any).style.height = "89.5vh";
  }, [blocklyRef]);

  return (
    <>
      <div className="fill-height" ref={blocklyRef} />
    </>
  );
}
