import Blockly from "blockly";

let flexDirection = [
  ["row", "row"],
  ["row-reverse", "row-reverse"],
  ["column", "column"],
  ["column-reverse", "column-reverse"],
  ["initial", "initial"],
  ["inherit", "inherit"],
];

generateDropDown("flex-direction", flexDirection);
generateDropDownJS("flex-direction");

generateDropDown("flex-flow", flexDirection);
generateDropDownJS("flex-flow");

let flexWrap = [
  ["nowrap", "nowrap"],
  ["wrap", "wrap"],
  ["wrap-reverse", "wrap-reverse"],
  ["initial", "initial"],
  ["inherit", "inherit"],
];
generateDropDown("flex-wrap", flexWrap);
generateDropDownJS("flex-wrap");

function generateDropDown(id, options) {
  Blockly.Blocks[`${id}`] = {
    init: function () {
      this.appendDummyInput()
        .appendField(`${id}:`)
        .appendField(new Blockly.FieldDropdown(options), "option");
      this.setColour('#4fc0c4');
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
