import Blockly from "blockly";
import { blockyValidation } from "../validation.ts";

const color = "#4fc0c4";

Blockly.Blocks["GetElementById"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Get Document By ")
      .appendField(new Blockly.FieldTextInput("id"), "id");

    this.appendStatementInput("Content").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(color);
  },
};

Blockly.JavaScript["GetElementById"] = function (block) {
  blockyValidation(block);
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  let id = block.getFieldValue("id");
  return `
      document.getElementById('${id}')${content.trim()}`;
};

Blockly.Blocks["OnClick"] = {
  init: function () {
    this.appendDummyInput().appendField("onclick alert");
    this.setPreviousStatement(true, null);
    this.setPreviousStatement(true, null);
    this.setColour(color);
  },
};

Blockly.JavaScript["OnClick"] = function (block) {
  blockyValidation(block);
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `.onclick = function(){alert('test')}`;
};
