// div , h, p, br,
import Blockly from "blockly";
import {
  generateGeneralBlockWithAttributes,
  generateGeneralBlockWithAttributesJS,
} from "./functionsCreateBlocks";

const basicColor = "#f26110";

generateGeneralBlockWithAttributes("paragraph", basicColor);
generateGeneralBlockWithAttributesJS("paragraph", "p");

generateGeneralBlockWithAttributes("br", basicColor);
generateGeneralBlockWithAttributesJS("br", "br");

generateGeneralBlockWithAttributes("strong", basicColor);
generateGeneralBlockWithAttributesJS("strong", "strong");

generateGeneralBlockWithAttributes("u", basicColor);
generateGeneralBlockWithAttributesJS("u", "u");

generateGeneralBlockWithAttributes("div", basicColor);
generateGeneralBlockWithAttributesJS("div", "div");

//text
Blockly.Blocks["regexInput"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("text:")
      .appendField(new Blockly.FieldTextInput("default"), "regex");
    this.setColour(basicColor);
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
    this.setColour(basicColor);
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
    this.appendDummyInput().appendField("br");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(basicColor);
  },
};

Blockly.JavaScript["br"] = function (block) {
  return `
  <br />`;
};
