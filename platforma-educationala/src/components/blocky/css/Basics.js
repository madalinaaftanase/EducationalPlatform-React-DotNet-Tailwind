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

//border
generateInputsBlocks("border", text);
generateInputsBlocksJS("border");

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
      this.setColour('#e32db6');
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

let borderStyleTypes = [
  ["border-style", "border-style"],
  ["border-left-style", "border-left-style"],
  ["border-right-style", "border-right-style"],
  ["border-top-style", "border-top-style"],
  ["border-bottom-style", "border-bottom-style"],
];

let borderStyleOptions =[
  ["none", "none"],
  ["hidden", "hidden"],
  ["dotted", "dotted"],
  ["dashed", "dashed"],
  ["solid", "solid"],
  ["double", "double"],
  ["groove", "groove"],
  ["ridge", "ridge"],
  ["inset", "inset"],
  ["outset", "outset"],
  ["initial", "initial"],
  ["inherit", "inherit"],
]

let borderWidthTypes = [
  ["border-width", "border-width"],
  ["border-left-width", "border-left-width"],
  ["border-right-width", "border-right-width"],
  ["border-top-width", "border-top-width"],
  ["border-bottom-width", "border-bottom-width"],
];
let borderWidthOptions = [
  ["medium", "medium"],
  ["thin", "thin"],
  ["thick", "thick"],
];

generateDoubleDropDown("borderStyle", borderStyleTypes, borderStyleOptions);
generateDoubleDropDownJS("borderStyle");

generateDoubleDropDown("borderWidth", borderWidthTypes, borderWidthOptions);
generateDoubleDropDownJS("borderWidth");

function generateDoubleDropDown(id,borderOption, options) {
  Blockly.Blocks[`${id}`] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(borderOption), "borderOption")
        .appendField(new Blockly.FieldDropdown(options), "option");
      this.setColour('#e32db6');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    },
  };
}

function generateDoubleDropDownJS(id) {
  Blockly.JavaScript[`${id}`] = function (block) {
    var borderOption = block.getFieldValue("borderOption");
    var opt = block.getFieldValue("option");
    return `${borderOption}: ${opt}; `;
  };
}



