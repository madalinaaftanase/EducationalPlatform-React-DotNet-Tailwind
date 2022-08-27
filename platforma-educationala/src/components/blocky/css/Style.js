import Blockly from "blockly";

Blockly.Blocks["style"] = {
  init: function () {
    this.appendDummyInput().appendField("style");
    this.appendStatementInput("Content").setCheck(null);
    this.setOutput(true);
    this.setColour(455);
  },
};

Blockly.JavaScript["style"] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `"${content}"`;
};

//color
Blockly.Blocks["color"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("color:")
      .appendField(new Blockly.FieldTextInput("black"), "value");
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
  },
};

Blockly.JavaScript["color"] = function (block) {
  let value = block.getFieldValue("value");
  return `color:${value}; `;
};
