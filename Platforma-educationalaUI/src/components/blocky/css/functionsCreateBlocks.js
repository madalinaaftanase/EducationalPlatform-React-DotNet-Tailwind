import Blockly from "blockly";
import { blockyValidation } from "../validation";
import { descriptionCSS } from "./description";

function generateInputsBlock(id, tooltips, color) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendDummyInput()
        .appendField(`${id}: `)
        .appendField(new Blockly.FieldTextInput("scrie aici"), "value");
      this.setNextStatement(true, null);
      this.setPreviousStatement(true, null);
      this.setColour(`${color}`);
      this.setTooltip(`${tooltips}`);
    },
  };
}

function generateInputColorBlock(id, tooltips, color) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendDummyInput()
        .appendField(`${id}: `)
        .appendField(new Blockly.FieldColour("scrie aici"), "value");
      this.setNextStatement(true, null);
      this.setPreviousStatement(true, null);
      this.setColour(`${color}`);
      this.setTooltip(`${tooltips}`);
    },
  };
}

// same code as generateInputColorBlock
function generateInputsBlockJS(id) {
  Blockly.JavaScript[id] = function (block) {
    blockyValidation(block);
    let value = block.getFieldValue("value");
    return `${id}: ${value}; `;
  };
}

function generateInputBlockGeneral(id, color) {
  const tooltips = descriptionCSS.get(id);
  generateInputsBlock(id, tooltips || "", color);
  generateInputsBlockJS(id);
}

function generateInputColorBlockGeneral(id, color) {
  const tooltips = descriptionCSS.get(id);
  generateInputColorBlock(id, tooltips || "", color);
  generateInputsBlockJS(id);
}

function generateDoubleInputsBlockGeneral(id, color) {
  const tooltips = descriptionCSS.get(id);
  generateDoubleInputsBlock(id, tooltips || "", color);
  generateDoubleInputsBlockJS(id);
}

function generateDoubleInputsBlock(id, tooltips, color) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("scrie aici"), "leftValue")
        .appendField(new Blockly.FieldTextInput("scrie aici"), "rightValue");
      this.setNextStatement(true, null);
      this.setPreviousStatement(true, null);
      this.setColour(`${color}`);
      this.setTooltip(`${tooltips}`);
    },
  };
}

function generateDoubleInputsBlockJS(id) {
  Blockly.JavaScript[id] = function (block) {
    blockyValidation(block);
    let leftValue = block.getFieldValue("leftValue");
    let rightValue = block.getFieldValue("rightValue");
    return `${leftValue}: ${rightValue}; `;
  };
}

// drop down
function generateDropDownBlockGeneral(id, options, color) {
  const tooltips = descriptionCSS.get(id);
  generateDropDownBlock(id, options, tooltips || "", color);
  generateDropDownBlockJS(id);
}
function generateDropDownBlock(id, options, tooltips, color) {
  Blockly.Blocks[`${id}`] = {
    init: function () {
      this.appendDummyInput()
        .appendField(`${id} =`)
        .appendField(new Blockly.FieldDropdown(options), "option");
      this.setColour(`${color}`);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(`${tooltips}`);
    },
  };
}

function generateDropDownBlockJS(id) {
  Blockly.JavaScript[`${id}`] = function (block) {
    blockyValidation(block);
    var opt = block.getFieldValue("option");
    return `${id}: ${opt}; `;
  };
}

// double drop down
function generateDoubleDropDownBlockGeneral(id, leftOptions, options, color) {
  const tooltips = descriptionCSS.get(id);
  generateDoubleDropDownBlock(id, leftOptions, options, color, tooltips || "");
  generateDoubleDropDownBlockJS(id);
}

function generateDoubleDropDownBlock(id, leftOptions, options, color, tooltips) {
  Blockly.Blocks[`${id}`] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(leftOptions), "leftOption")
        .appendField(new Blockly.FieldDropdown(options), "option");
      this.setColour(`${color}`);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(`${tooltips}`);
    },
  };
}

function generateDoubleDropDownBlockJS(id) {
  Blockly.JavaScript[`${id}`] = function (block) {
    blockyValidation(block);
    var borderOption = block.getFieldValue("leftOption");
    var opt = block.getFieldValue("option");
    return `${borderOption}: ${opt}; `;
  };
}

//
function generateDropDownAndInputBlockGeneral(id, options, color) {
  const tooltips = descriptionCSS.get(id);
  generateDropDownAndInputBlock(id, options, color, tooltips || "");
  generateDropDownAndInputBlockJS(id);
}

function generateDropDownAndInputBlock(id, options, color, tooltips) {
  Blockly.Blocks[`${id}`] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(options), "option")
        .appendField(new Blockly.FieldTextInput("scrie aici"), "value");
      this.setColour(`${color}`);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(`${tooltips}`);
    },
  };
}

function generateDropDownAndInputBlockJS(id) {
  Blockly.JavaScript[`${id}`] = function (block) {
    blockyValidation(block);
    var opt = block.getFieldValue("option");
    let value = block.getFieldValue("value");

    return `${opt}: ${value}; `;
  };
}

export {
  generateInputBlockGeneral,
  generateDoubleInputsBlockGeneral,
  generateDropDownBlockGeneral,
  generateDoubleDropDownBlockGeneral,
  generateDropDownAndInputBlockGeneral,
  generateInputColorBlockGeneral,
};
