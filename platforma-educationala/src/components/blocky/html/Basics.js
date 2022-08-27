// div , h, p, br,
import Blockly from "blockly";

//div
Blockly.Blocks["div"] = {
  init: function () {
    this.appendValueInput("style").setCheck(null).appendField("div");
    this.appendStatementInput("Content").setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
  },
};

Blockly.JavaScript["div"] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  var styleBlock = block.getInputTargetBlock("style");
  var style = Blockly.JavaScript.blockToCode(styleBlock);
  if (style) {
    return `<div style=${style}> ${content} </div>`;
  }
  return `<div> ${content} </div>`;
};

//text
Blockly.Blocks["regexInput"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("text:")
      .appendField(new Blockly.FieldTextInput("default"), "regex");
    this.setColour(205);
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
  },
};

Blockly.JavaScript["regexInput"] = function (block) {
  let value_regex = block.getFieldValue("regex");
  return value_regex;
};

//h
Blockly.Blocks["h"] = {
  init: function () {
    this.appendValueInput("style")
      .setCheck(null)
      .appendField(
        new Blockly.FieldDropdown([
          ["h1", "h1"],
          ["h2", "h2"],
          ["h3", "h3"],
          ["h4", "h4"],
          ["h5", "h5"],
          ["h6", "h6"],
        ]),
        "optionH"
      );
    this.appendStatementInput("Content").setCheck(null);
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
    this.setColour(65);
  },
};

Blockly.JavaScript["h"] = function (block) {
  var option = block.getFieldValue("optionH");
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  var styleBlock = block.getInputTargetBlock("style");
  var style = Blockly.JavaScript.blockToCode(styleBlock);
  if (style) {
    return `<${option} style=${style}> ${content} </${option}>`;
  }
  return `<${option}> ${content} </${option}>`;
};
