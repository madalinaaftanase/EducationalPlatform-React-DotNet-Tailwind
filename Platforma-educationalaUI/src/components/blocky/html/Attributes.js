import Blockly from "blockly";
import { generateInputFormBlockGeneral } from "./functionsCreateBlocks";
import { generateDropDownBlockGeneral } from "../css/functionsCreateBlocks";
import { blockyValidation } from "../validation";

const attributeColor = "#f7ad45";
const tooltips = "";
const typeOptions = [
  ["text", "text"],
  ["checkbox", "checkbox"],
  ["date", "date"],
  ["password", "password"],
  ["email", "email"],
  ["image", "image"],
  ["submit", "submit"],
  ["hidden", "hidden"],
  ["radio", "radio"],
  ["reset", "reset"],
  ["url", "url"],
];

Blockly.Blocks["attributes"] = {
  init: function () {
    this.appendDummyInput().appendField("attributes");
    this.appendStatementInput("Content").setCheck(null);
    this.setOutput(true);
    this.setColour(attributeColor);
  },
};

Blockly.JavaScript["attributes"] = function (block) {
  blockyValidation(block);
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `${content}`;
};

Blockly.Blocks["style"] = {
  init: function () {
    this.appendDummyInput().appendField("style");
    this.appendStatementInput("Content").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(attributeColor);
    this.setInputsInline(false);
  },
};

Blockly.JavaScript["style"] = function (block) {
  blockyValidation(block);
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `style="${content.trim()}" `;
};

generateDropDownBlockGeneral("type", typeOptions, attributeColor);
generateInputFormBlockGeneral("id", "id", "#4fc0c4", tooltips);
generateInputFormBlockGeneral("heightAttr", "height", attributeColor, tooltips);
generateInputFormBlockGeneral("src", "src", attributeColor, tooltips);
generateInputFormBlockGeneral("alt", "alt", attributeColor, tooltips);

// one world e.g. required...
Blockly.Blocks["parameter"] = {
  init: function () {
    this.appendDummyInput().appendField(new Blockly.FieldTextInput("scrie aici"), "value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(attributeColor);
  },
};

Blockly.JavaScript["parameter"] = function (block) {
  blockyValidation(block);
  let val = block.getFieldValue("value");
  return `${val} `;
};
