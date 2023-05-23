import Blockly from "blockly";
import { blockyValidation } from "../validation";
import { descriptionBlock } from "./description";

function generateInlineBlock(id, color, tooltips) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendValueInput("attribute").setCheck(null).appendField(id);
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(color);
      this.setTooltip(`${tooltips}`);
    },
  };
}

function generateInlineBlockJS(id, tag) {
  Blockly.JavaScript[id] = function (block) {
    blockyValidation(block);
    var attributeBlock = block.getInputTargetBlock("attribute");
    var attributes = Blockly.JavaScript.blockToCode(attributeBlock);
    if (attributes) {
      return `<${tag}${attributes} />`;
    }
    return `<${tag} />`;
  };
}

function generateInlineBlockGeneral(id, tag, color) {
  const tooltips = descriptionBlock.get(id);
  generateInlineBlock(id, color, tooltips || "");
  generateInlineBlockJS(id, tag);
}

function generateGeneralBlockWithAttributes(id, color, tooltips) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendValueInput("attribute").setCheck(null).appendField(id);
      this.appendStatementInput("Content").setCheck(null);
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(color);
      this.setTooltip(`${tooltips}`);
    },
  };
}

function generateGeneralBlockWithAttributesJS(id, tag) {
  Blockly.JavaScript[id] = function (block) {
    blockyValidation(block);
    var content = Blockly.JavaScript.statementToCode(block, "Content");
    var attributeBlock = block.getInputTargetBlock("attribute");
    var attributes = Blockly.JavaScript.blockToCode(attributeBlock);
    if (attributes) {
      return `<${tag}${attributes}> ${content} </${tag}>`;
    }
    return `
      <${tag}>
       ${content} 
      </${tag}>`;
  };
}

function generateBlockWithAttributesGeneral(id, tag, color) {
  const tooltips = descriptionBlock.get(id);
  generateGeneralBlockWithAttributes(id, color, tooltips || "");
  generateGeneralBlockWithAttributesJS(id, tag);
}

// blocks
function generateInputFormBlockGeneral(id, tag, color) {
  const tooltips = descriptionBlock.get(id);
  generateInputFormBlock(id, tag, color, tooltips || "");
  generateInputFormBlockJS(id, tag);
}

function generateInputFormBlock(id, tag, color, tooltips) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendDummyInput()
        .appendField(`${tag} =`)
        .appendField(new Blockly.FieldTextInput("scrie aici"), "value");
      this.setNextStatement(true, null);
      this.setPreviousStatement(true, null);
      this.setColour(`${color}`);
      this.setTooltip(`${tooltips}`);
    },
  };
}

function generateInputFormBlockJS(id, tag) {
  Blockly.JavaScript[id] = function (block) {
    blockyValidation(block);
    let value = block.getFieldValue("value");
    return `${tag} = "${value}" `;
  };
}

export {
  generateBlockWithAttributesGeneral,
  generateInputFormBlockGeneral,
  generateInlineBlockGeneral,
};
