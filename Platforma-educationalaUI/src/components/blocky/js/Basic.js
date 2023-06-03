import Blockly from "blockly";
import { blockyValidation } from "../validation.ts";

const color = "#4fc0c4";

Blockly.Blocks["script"] = {
  init: function () {
    this.appendDummyInput().appendField("script");
    this.appendStatementInput("Content").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(color);
  },
};

Blockly.JavaScript["script"] = function (block) {
  blockyValidation(block);
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `<script> ${content} </script>`;
};

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

Blockly.Blocks["Set Timeout"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Timeout")
      .appendField(new Blockly.FieldTextInput(5), "Seconds")
      .appendField("Seconds");

    this.appendStatementInput("Content").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(color);
  },
};

Blockly.JavaScript["Set Timeout"] = function (block) {
  blockyValidation(block);
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  let seconds = Number(block.getFieldValue("Seconds"));
  return `
    setTimeout(() => {
      ${content.trim()}
    }, ${seconds * 1000});`;
};

Blockly.Blocks["Set Interval"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Interval")
      .appendField(new Blockly.FieldTextInput(5), "Seconds")
      .appendField("Seconds");

    this.appendStatementInput("Content").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(color);
  },
};

Blockly.JavaScript["Set Interval"] = function (block) {
  blockyValidation(block);
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  let seconds = Number(block.getFieldValue("Seconds"));
  return `
    setInterval(() => {
      ${content.trim()}
    }, ${seconds * 1000});`;
};
