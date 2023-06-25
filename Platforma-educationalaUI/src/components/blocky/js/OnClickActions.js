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
  content = content.trim().replace(" ", "").replace(":", '="').replace(";", '";').split("");

  // schimba din background-color in backgroundColor
  while (content.includes("-")) {
    const index = content.indexOf("-");
    content.splice(index, 1);
    content[index] = content[index].toUpperCase();
  }
  content = content.join("");

  return `.style.${content}
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
