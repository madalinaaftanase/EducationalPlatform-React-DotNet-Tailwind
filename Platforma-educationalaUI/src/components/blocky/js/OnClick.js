import Blockly from "blockly";
import { blockyValidation } from "../validation.ts";

const color = "#4fc0f4";

createEventHandler("onClick");
createEventHandler("onMouseDown");
createEventHandler("onMouseEnter");
createEventHandler("onMouseLeave");
createEventHandler("onMouseMove");
createEventHandler("onMouseOut");
createEventHandler("onMouseOver");
createEventHandler("onMouseUp");

function createEventHandler(id) {
  createEventHandlerHtml(id);
  createEventHandlerJs(id);
}

function createEventHandlerHtml(id) {
  Blockly.Blocks[id] = {
    init: function () {
      this.appendDummyInput().appendField(id);
      this.appendStatementInput("Content").setCheck(null);
      this.setPreviousStatement(true, null);
      this.setPreviousStatement(true, null);
      this.setColour(color);
    },
  };
}

function createEventHandlerJs(id) {
  Blockly.JavaScript[id] = function (block) {
    blockyValidation(block);
    var content = Blockly.JavaScript.statementToCode(block, "Content");
    return `.${id.toLowerCase()} = function() {${content}
  }`;
  };
}
