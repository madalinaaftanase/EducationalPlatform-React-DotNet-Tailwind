import Blockly from "blockly";
import { generateInputFormBlock, generateInputFormBlockJS } from "./functionsCreateBlocks";
import { generateDropDownBlock, generateDropDownBlockJS } from "../css/functionsCreateBlocks";

const color = "#84a671";
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
    this.setColour(color);
  },
};

Blockly.JavaScript["attributes"] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `${content}`;
};

Blockly.Blocks["style"] = {
  init: function () {
    this.appendDummyInput().appendField("style");
    this.appendStatementInput("Content").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(color);
    this.setInputsInline(false);
  },
};

Blockly.JavaScript["style"] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `style="${content.trim()}" `;
};

generateDropDownBlock("type", typeOptions, color);
generateDropDownBlockJS("type");

generateInputFormBlock("id", "id", "#4fc0c4", tooltips);
generateInputFormBlockJS("id", "id");

generateInputFormBlock("heightAttr", "height", color, tooltips);
generateInputFormBlockJS("heightAttr", "height");

generateInputFormBlock("src", "src", color, tooltips);
generateInputFormBlockJS("src", "src");

generateInputFormBlock("alt", "alt", color, tooltips);
generateInputFormBlockJS("alt", "alt");

// one world e.g. required...
Blockly.Blocks["parameter"] = {
  init: function () {
    this.appendDummyInput().appendField(new Blockly.FieldTextInput("scrie aici"), "value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(color);
  },
};

Blockly.JavaScript["parameter"] = function (block) {
  let val = block.getFieldValue("value");
  return `${val} `;
};