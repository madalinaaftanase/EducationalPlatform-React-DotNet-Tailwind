import Blockly from "blockly";
import { blockyValidation } from "../validation.ts";

const color = "#f7fd45";

Blockly.Blocks["styleProp"] = {
  init: function () {
    this.appendDummyInput().appendField("style");
    this.appendStatementInput("Content").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(color);
    this.setInputsInline(false);
  },
};

Blockly.JavaScript["styleProp"] = function (block) {
  blockyValidation(block);
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `.style.${content.trim().replace(" ", "").replace(":", '="').replace(";", '";')}
  `;
};

Blockly.Blocks["inner html"] = {
  init: function () {
    this.appendDummyInput().appendField("innerHTML");
    this.appendStatementInput("Content").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(color);
    this.setInputsInline(false);
  },
};

Blockly.JavaScript["inner html"] = function (block) {
  blockyValidation(block);
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `.innerHTML="${content.trim()}";
  `;
};
