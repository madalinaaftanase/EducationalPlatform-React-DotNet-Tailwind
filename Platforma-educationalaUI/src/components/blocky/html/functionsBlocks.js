import Blockly from "blockly";
// atributes
function generateGeneralBlockWithAttributes(id, color) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendValueInput("attribute").setCheck(null).appendField(id);
      this.appendStatementInput("Content").setCheck(null);
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(color);
    },
  };
}

function generateGeneralBlockWithAttributesJS(id, tag) {
  Blockly.JavaScript[id] = function (block) {
    var content = Blockly.JavaScript.statementToCode(block, "Content");
    var attributeBlock = block.getInputTargetBlock("attribute");
    var attributes = Blockly.JavaScript.blockToCode(attributeBlock);
    if (attributes) {
      return `<${tag} ${attributes}> ${content} </${tag}>`;
    }
    return `
      <${tag}>
       ${content} 
      </${tag}>`;
  };
}

function generateGeneralBlock(id, color) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendValueInput("style").setCheck(null).appendField(id);
      this.appendStatementInput("Content").setCheck(null);
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(color);
      this.setTooltip("");
      this.setHelpUrl("");
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
      <${tag}> ${content} 
      </${tag}>`;
  };
}

// blocks
function generateInputFormBlock(id, tag, color, tooltips) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendDummyInput()
        .appendField(`${tag}= `)
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
    let value = block.getFieldValue("value");
    return `${tag}= "${value}" `;
  };
}

export {
  generateGeneralBlockWithAttributes,
  generateGeneralBlockWithAttributesJS,
  generateGeneralBlock,
  generateGeneralBlockJS,
  generateInputFormBlock,
  generateInputFormBlockJS,
};
