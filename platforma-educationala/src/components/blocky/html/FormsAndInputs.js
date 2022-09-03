// w3schools.com/tags/ref_byfunc.asp
import Blockly from "blockly";
import { generateDropDownBlock } from "../css/functionsCreateBlocks";
import {
  generateGeneralBlockWithAttributes,
  generateGeneralBlockWithAttributesJS,
  generateInputFormBlock,
  generateInputFormBlockJS,
} from "./functionsBlocks";

const formColor = "#dedb2c";
const tooltips = "";

// attribute
Blockly.Blocks["attributes"] = {
  init: function () {
    this.appendDummyInput().appendField("attributes");
    this.appendStatementInput("Content").setCheck(null);
    this.setOutput(true);
    this.setColour(formColor);
  },
};

Blockly.JavaScript["attributes"] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `"${content}"`;
};

generateGeneralBlockWithAttributes("form", formColor);
generateGeneralBlockWithAttributesJS("form", "form");

generateGeneralBlockWithAttributes("label", formColor);
generateGeneralBlockWithAttributesJS("label", "label");

// type
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
generateDropDownBlock("type", typeOptions, formColor);

Blockly.JavaScript[`type`] = function (block) {
  var opt = block.getFieldValue("option");
  return `type= "${opt}" `;
};

//input
Blockly.Blocks["input"] = {
  init: function () {
    this.appendValueInput("attribute").setCheck(null).appendField("input");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(formColor);
  },
};

Blockly.JavaScript["input"] = function (block) {
  var attributeBlock = block.getInputTargetBlock("attribute");
  var attributes = Blockly.JavaScript.blockToCode(attributeBlock);
  if (attributes) {
    return `<input ${attributes} />`;
  }
  return `<input />`;
};

// one world e.g. required...
Blockly.Blocks["parameter"] = {
    init: function () {
        this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("scrie aici"), "value");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(formColor);
    },
  };

  Blockly.JavaScript["parameter"] = function (block) {
    let val = block.getFieldValue("value");
    return `${val} `;
  };

  //others

  generateInputFormBlock("form-height", "height", formColor, tooltips);
  generateInputFormBlockJS("form-height", "height");

  generateInputFormBlock("src-form", "src", formColor, tooltips);
  generateInputFormBlockJS("src-form", "src");

  generateInputFormBlock("alt-form", "alt", formColor, tooltips);
  generateInputFormBlockJS("alt-form", "alt");
