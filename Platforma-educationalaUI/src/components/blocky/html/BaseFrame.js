import Blockly from "blockly";
// head , title, meta , body, footer , top nav

function getColor() {
  return "#f22010";
}

Blockly.Blocks["document"] = {
  init: function () {
    this.appendDummyInput().appendField("document");
    this.appendStatementInput("Content").setCheck(null);
    this.setInputsInline(true);
    this.setColour(getColor());
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["document"] = function (block) {
  var content = Blockly.JavaScript.statementToCode(block, "Content");
  return `<! DOCTYPE HTML > 
  <html>
   ${content} 
  </html>`;
};

let content = generateBaseFrameComponent("body");
let contentFunction = generateFunction("body", "body");

let header = generateBaseFrameComponent("header");
let headerFunction = generateFunction("header", "head");

function generateFunction(id, tag) {
  Blockly.JavaScript[id] = function (block) {
    var content = Blockly.JavaScript.statementToCode(block, "Content");
    return `<${tag}> ${content} </${tag}>`;
  };
}

function generateBaseFrameComponent(id) {
  return (Blockly.Blocks[id] = {
    init: function () {
      this.appendDummyInput().appendField(id);
      this.appendStatementInput("Content").setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(getColor());
      this.setTooltip("");
      this.setHelpUrl("");
    },
  });
}
