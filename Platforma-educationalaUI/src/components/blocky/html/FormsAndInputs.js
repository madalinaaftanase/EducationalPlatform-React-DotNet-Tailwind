// w3schools.com/tags/ref_byfunc.asp
import Blockly from "blockly";
import { generateDropDownBlock } from "../css/functionsCreateBlocks";
import {
  generateGeneralBlockWithAttributes,
  generateGeneralBlockWithAttributesJS,
} from "./functionsCreateBlocks";

const formColor = "#dedb2c";

generateGeneralBlockWithAttributes("form", formColor);
generateGeneralBlockWithAttributesJS("form", "form");

generateGeneralBlockWithAttributes("label", formColor);
generateGeneralBlockWithAttributesJS("label", "label");

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

