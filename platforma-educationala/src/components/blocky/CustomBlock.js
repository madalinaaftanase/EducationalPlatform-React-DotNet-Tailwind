import Blockly from "blockly";

Blockly.Blocks["div"] = {
  init: function () {
    this.appendDummyInput().appendField("div");
    this.appendStatementInput("Content").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(215);
    this.setTooltip("");
    this.setHelpUrl("");
  },
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
    this.setOutput(true, "String");
  },
};

Blockly.JavaScript["regexInput"] = function (block) {
  let value_regex = block.getFieldValue("regex");
  return value_regex;
};

Blockly.Blocks["simplebot"] = {
  init: function () {
    this.appendDummyInput().appendField("Simple bot");
    this.appendValueInput("botToken").setCheck(null).appendField("bot token");
    this.appendDummyInput().appendField("do");
    this.appendStatementInput("simpleActions").setCheck(null);
    this.setInputsInline(false);
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["simplebot"] = function (block) {
  var value_bottoken = Blockly.JavaScript.valueToCode(
    block,
    "botToken",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var statements_simpleactions = Blockly.JavaScript.statementToCode(
    block,
    "simpleActions"
  );

  var code = `import TelegramBot from "node-telegram-bot-api";\nconst token = ${value_bottoken}\nconst bot = new TelegramBot(token, { polling: true});\napp = async () => {\n${statements_simpleactions}\n};\napp().then(() => console.log("started"));`;
  return code;
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

Blockly.Blocks["return"] = {
  init: function () {
    this.appendValueInput("NAME").setCheck(null).appendField("return");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setColour(330);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["return"] = function (block) {
  var value_name = Blockly.JavaScript.valueToCode(
    block,
    "NAME",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  var code = "return " + value_name + "\n";
  return code;
};
