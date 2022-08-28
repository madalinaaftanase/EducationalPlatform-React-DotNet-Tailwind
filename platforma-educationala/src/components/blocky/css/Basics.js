import Blockly from "blockly";
const text = "face ceva";

//color
generateInputsBlocks("color", text);
generateInputsBlocksJS("color");

//bg
//color
generateInputsBlocks("background-color", text);
generateInputsBlocksJS("background-color");

//font-size
generateInputsBlocks("font-size", text);
generateInputsBlocksJS("font-size");

function generateInputsBlocks(id, tooltips) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendDummyInput()
        .appendField(`${id}: `)
        .appendField(new Blockly.FieldTextInput("scrie aici"), "value");
      this.setNextStatement(true, null);
      this.setPreviousStatement(true, null);
      this.setColour("#e32db6");
      this.setTooltip(`${tooltips}`);
    },
  };
}

function generateInputsBlocksJS(id) {
  Blockly.JavaScript[id] = function (block) {
    let value = block.getFieldValue("value");
    return `${id}: ${value}; `;
  };
}

let optionsDisplay = [
  ["inline", "inline"],
  ["flex", "flex"],
  ["grid", "grid"],
  ["block", "block"],
  ["none", "none"],
];
generateDropDown("display", optionsDisplay);
generateDropDownJS("display");

function generateDropDown(id, options) {
  Blockly.Blocks[`${id}`] = {
    init: function () {
      this.appendDummyInput()
        .appendField(`${id}:`)
        .appendField(new Blockly.FieldDropdown(options), "option");
      this.setColour(54);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    },
  };
}

function generateDropDownJS(id) {
  Blockly.JavaScript[`${id}`] = function (block) {
    var opt = block.getFieldValue("option");
    return `${id}: ${opt}; `;
  };
}
