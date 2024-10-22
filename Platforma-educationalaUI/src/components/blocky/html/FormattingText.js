import Blockly from "blockly";
import { blockyValidation } from "../validation";
import { generateBlockWithAttributesGeneral } from "./functionsCreateBlocks";

const basicColor = "#f26110";
//mark,i, em, big, small, button, option, select, nav,main,aside,section,header,article,figure,audio, video, img
generateBlockWithAttributesGeneral("paragraph", "p", basicColor);
generateBlockWithAttributesGeneral("br", "br", basicColor);
generateBlockWithAttributesGeneral("strong", "strong", basicColor);
generateBlockWithAttributesGeneral("mark", "mark", basicColor);
generateBlockWithAttributesGeneral("u", "u", basicColor);
generateBlockWithAttributesGeneral("i", "i", basicColor);
generateBlockWithAttributesGeneral("em", "em", basicColor);
generateBlockWithAttributesGeneral("big", "big", basicColor);
generateBlockWithAttributesGeneral("small", "small", basicColor);

Blockly.Blocks["text"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("text:")
      .appendField(new Blockly.FieldTextInput("default"), "regex");
    this.setColour(basicColor);
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
  },
};

Blockly.JavaScript["text"] = function (block) {
  blockyValidation(block);
  let value_regex = block.getFieldValue("regex");
  return value_regex;
};

//h
Blockly.Blocks["h"] = {
  init: function () {
    this.appendValueInput("attribute")
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
  blockyValidation(block);
  var option = block.getFieldValue("optionH");
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  var attributeBlock = block.getInputTargetBlock("attribute");
  var attributes = Blockly.JavaScript.blockToCode(attributeBlock);
  if (attributes) {
    return `<${option}${attributes}> ${content} </${option}>`;
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
  blockyValidation(block);
  return `
  <br />`;
};
