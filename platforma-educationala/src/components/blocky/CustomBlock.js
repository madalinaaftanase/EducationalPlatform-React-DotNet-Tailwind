import Blockly from "blockly";

Blockly.Blocks["div"] = {
  init: function () {
    this.appendDummyInput().appendField("div");
    this.appendStatementInput("Content").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(215);
    this.setTooltip("div");
  },
};

Blockly.Blocks["style"] = {
  init: function () {
    this.appendDummyInput().appendField("style");
    this.appendStatementInput("Content").setCheck(null);
    this.setOutput(true);
    this.setColour(455);
  },
};

Blockly.Blocks["emoji"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["h1", "h3"],
        ["h2", "h1"],
        ["h3", "h2"],
        ["Qualquer um", "h0"],
      ]),
      "optEmoji"
    );
    this.setPreviousStatement(true, null);
    this.appendStatementInput("Content").setCheck(null);

    this.setNextStatement(true, null);
    this.setOutput(true, null); // nu merge fara asta
    this.setColour(65);
  },
};

Blockly.JavaScript["emoji"] = function (block) {
  var dropdown_optemoji = block.getFieldValue("optEmoji");
  var code = dropdown_optemoji;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["style"] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `<style> ${content} </style>`;
};

Blockly.JavaScript["div"] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `<div> ${content} </div>`;
};

Blockly.Blocks["regexInput"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("text:")
      .appendField("/")
      .appendField(new Blockly.FieldTextInput("default"), "regex")
      .appendField("/i");
    this.setColour(205);
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
  },
};

Blockly.JavaScript["regexInput"] = function (block) {
  let value_regex = block.getFieldValue("regex");
  return value_regex;
};

Blockly.Blocks["simplebot"] = {
  init: function () {
    this.appendValueInput("botToken")
      .setCheck(null)
      .appendField("nume ce vrei");
    this.appendStatementInput("simpleActions").setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["simplebot"] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `<div> ${content} </div>`;
};

Blockly.Blocks["responceontext"] = {
  init: function () {
    this.appendValueInput("onText")
      .setCheck(null)
      .appendField("on text or regex");
    this.appendValueInput("responceText")
      .setCheck(null)
      .appendField("respond the following text");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["responceontext"] = function (block) {
  var value_ontext = Blockly.JavaScript.valueToCode(
    block,
    "onText",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var value_responcetext = Blockly.JavaScript.valueToCode(
    block,
    "responceText",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  var code = `bot.onText(\n\t${value_ontext},\n\tasync (msg) => {\n\t\tconst chatId = msg.chat.id;\n\t\treturn await bot.sendMessage(chatId, ${value_responcetext});\n\t}\n);\n`;
  return code;
};
