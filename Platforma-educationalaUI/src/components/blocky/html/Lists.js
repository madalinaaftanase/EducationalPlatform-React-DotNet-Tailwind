// ul li ol dl dt dd
import Blockly from "blockly";

generateGeneralBlock("ul");
generateGeneralBlockJS("ul", "ul");

generateGeneralBlock("ol");
generateGeneralBlockJS("ol","ol");

generateGeneralBlock("li");
generateGeneralBlockJS("li","li");

generateGeneralBlock("dl");
generateGeneralBlockJS("dl","dl");

generateGeneralBlock("dt");
generateGeneralBlockJS("dt","dt");

generateGeneralBlock("dd");
generateGeneralBlockJS("dd","dd");

function generateGeneralBlock(id) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendValueInput("style").setCheck(null).appendField(id);
      this.appendStatementInput("Content").setCheck(null);
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#4fc488');
    },
  };
}

function generateGeneralBlockJS(id, tag) {
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
