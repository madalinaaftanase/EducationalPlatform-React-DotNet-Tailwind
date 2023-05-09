import Blockly from "blockly";
import {
  generateGeneralBlockWithAttributes,
  generateGeneralBlockWithAttributesJS,
} from "./functionsCreateBlocks";
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

generateGeneralBlockWithAttributes("body", getColor());
generateGeneralBlockWithAttributesJS("body", "body");

generateGeneralBlockWithAttributes("footer", getColor());
generateGeneralBlockWithAttributesJS("footer", "footer");

generateGeneralBlockWithAttributes("head", getColor());
generateGeneralBlockWithAttributesJS("head", "head");

generateGeneralBlockWithAttributes("title", getColor());
generateGeneralBlockWithAttributesJS("title", "title");
