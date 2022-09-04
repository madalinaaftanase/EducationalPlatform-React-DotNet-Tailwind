import "./Basics";
import "./Flex";
import "./Border";
import "./Grid";

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
