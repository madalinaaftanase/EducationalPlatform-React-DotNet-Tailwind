// div , h, p, br,
import Blockly from "blockly";

function getColor(){
  return '#f26110';
}

generateGeneralBlock("paragraph");
generateGeneralBlockJS("paragraph", "p");

generateGeneralBlock("div");
generateGeneralBlockJS("div", "div");

//text
Blockly.Blocks["regexInput"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("text:")
      .appendField(new Blockly.FieldTextInput("default"), "regex");
    this.setColour(getColor());
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
    this.setColour(getColor());
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

//br
Blockly.Blocks["br"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("br")
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(getColor());
  },
};

Blockly.JavaScript["br"] = function (block) {
  return `
  <br />`;
};

// functions

function generateGeneralBlock(id) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendValueInput("style").setCheck(null).appendField(id);
      this.appendStatementInput("Content").setCheck(null);
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(getColor());
    },
  };
}

function generateGeneralBlockJS(id, tag) {
  Blockly.JavaScript[id] = function (block) {
    var content = Blockly.JavaScript.statementToCode(block, "Content");
    var styleBlock = block.getInputTargetBlock("style");
    var style = Blockly.JavaScript.blockToCode(styleBlock);
    if (style) {
      return `<${tag} style=${style}> ${content} </${tag}>`;
    }
    return `
    <${tag}>
     ${content} 
    </${tag}>`;
  };
}
