import Blockly from "blockly";
import { blockyValidation } from "../validation";
import { generateBlockWithAttributesGeneral } from "./functionsCreateBlocks";

const baseFrame = "#f22010";

Blockly.Blocks["document"] = {
  init: function () {
    this.appendDummyInput().appendField("document");
    this.appendStatementInput("Content").setCheck(null);
    this.setInputsInline(true);
    this.setColour(baseFrame);
    this.setTooltip("Elementul radacina, contine toate celalalte elemente");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["document"] = function (block) {
  blockyValidation(block);
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `<!DOCTYPE HTML> 
  <html>
   ${content} 
  </html>`;
};

generateBlockWithAttributesGeneral("body", "body", baseFrame);
generateBlockWithAttributesGeneral("footer", "footer", baseFrame);
generateBlockWithAttributesGeneral("head", "head", baseFrame);
generateBlockWithAttributesGeneral("title", "title", baseFrame);
