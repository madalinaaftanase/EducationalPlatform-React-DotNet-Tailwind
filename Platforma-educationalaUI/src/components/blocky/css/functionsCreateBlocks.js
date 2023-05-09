import Blockly from "blockly";

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

function generateInputsBlockJS(id) {
  Blockly.JavaScript[id] = function (block) {
    let value = block.getFieldValue("value");
    return `${id}: ${value}; `;
  };
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
    let leftValue = block.getFieldValue("leftValue");
    let rightValue = block.getFieldValue("rightValue");
    return `${leftValue}: ${rightValue}; `;
  };
}

// drop down

function generateDropDownBlock(id, options, color) {
  Blockly.Blocks[`${id}`] = {
    init: function () {
      this.appendDummyInput()
        .appendField(`${id} =`)
        .appendField(new Blockly.FieldDropdown(options), "option");
      this.setColour(`${color}`);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    },
  };
}

function generateDropDownBlockJS(id) {
  Blockly.JavaScript[`${id}`] = function (block) {
    var opt = block.getFieldValue("option");
    return `${id}: ${opt}; `;
  };
}

function generateDoubleDropDownBlock(id, leftOptions, options, color) {
  Blockly.Blocks[`${id}`] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(leftOptions), "leftOption")
        .appendField(new Blockly.FieldDropdown(options), "option");
      this.setColour(`${color}`);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    },
  };
}

function generateDoubleDropDownBlockJS(id) {
  Blockly.JavaScript[`${id}`] = function (block) {
    var borderOption = block.getFieldValue("leftOption");
    var opt = block.getFieldValue("option");
    return `${borderOption}: ${opt}; `;
  };
}

function generateDropDownAndInputBlock(id, options, color) {
  Blockly.Blocks[`${id}`] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(options), "option")
        .appendField(new Blockly.FieldTextInput("scrie aici"), "value");
      this.setColour(`${color}`);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    },
  };
}

function generateDropDownAndInputBlockJS(id) {
  Blockly.JavaScript[`${id}`] = function (block) {
    var opt = block.getFieldValue("option");
    let value = block.getFieldValue("value");

    return `${opt}: ${value}; `;
  };
}

export {
  generateInputsBlock,
  generateInputsBlockJS,
  generateDoubleInputsBlock,
  generateDoubleInputsBlockJS,
  generateDropDownBlock,
  generateDropDownBlockJS,
  generateDoubleDropDownBlock,
  generateDoubleDropDownBlockJS,
  generateDropDownAndInputBlock,
  generateDropDownAndInputBlockJS,
};
