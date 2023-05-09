// ul li ol dl dt dd
import Blockly from "blockly";

generateGeneralBlockWithAttributes("ul");
generateGeneralBlockWithAttributesJS("ul", "ul");

generateGeneralBlockWithAttributes("ol");
generateGeneralBlockWithAttributesJS("ol", "ol");

generateGeneralBlockWithAttributes("li");
generateGeneralBlockWithAttributesJS("li", "li");

generateGeneralBlockWithAttributes("dl");
generateGeneralBlockWithAttributesJS("dl", "dl");

generateGeneralBlockWithAttributes("dt");
generateGeneralBlockWithAttributesJS("dt", "dt");

generateGeneralBlockWithAttributes("dd");
generateGeneralBlockWithAttributesJS("dd", "dd");

function generateGeneralBlockWithAttributes(id) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendValueInput("style").setCheck(null).appendField(id);
      this.appendStatementInput("Content").setCheck(null);
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#4fc488");
    },
  };
}

function generateGeneralBlockWithAttributesJS(id, tag) {
  Blockly.JavaScript[id] = function (block) {
    var content = Blockly.JavaScript.statementToCode(block, "Content");
    var styleBlock = block.getInputTargetBlock("style");
    var style = Blockly.JavaScript.blockToCode(styleBlock);
    if (style) {
      return `<${tag} style=${style}> ${content} </${tag}>`;
    }
    return `<${tag}> ${content} </${tag}>`;
  };
}
