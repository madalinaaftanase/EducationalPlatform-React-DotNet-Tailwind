// @ts-ignore
import beautify from "xml-beautifier";
import Blockly from "blockly";

export const getHtmlCode = (xml: string) => {
    const workspace = new Blockly.Workspace();
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);
    const htmlCode = (Blockly as any).JavaScript.workspaceToCode(workspace);
    return beautify(htmlCode)
}