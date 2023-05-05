import Blockly from "blockly";
import { generateGeneralBlock, generateGeneralBlockJS } from "./functionsBlocks";
// head , title, meta , body, footer , top nav

function getColor() {
  return "#f22010";
}

Blockly.Blocks["document"] = {
  init: function () {
    this.appendDummyInput().appendField("document");
    this.appendStatementInput("Content").setCheck(null);
    this.setInputsInline(true);
    this.setColour(getColor());
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["document"] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `<! DOCTYPE HTML > 
  <html>
   ${content} 
  </html>`;
};

generateGeneralBlock("body", getColor());
generateGeneralBlockJS("body", "body");

generateGeneralBlock("footer", getColor());
generateGeneralBlockJS("footer", "footer");

generateGeneralBlock("head", getColor());
generateGeneralBlockJS("head", "head");

generateGeneralBlock("title", getColor());
generateGeneralBlockJS("title", "title");
