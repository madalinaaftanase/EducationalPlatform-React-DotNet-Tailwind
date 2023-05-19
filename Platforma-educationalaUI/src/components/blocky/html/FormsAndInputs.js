import Blockly from "blockly";
import { generateBlockWithAttributesGeneral } from "./functionsCreateBlocks";
import { blockyValidation } from "../validation";
import { descriptionBlock } from "./description";

const formColor = "#dedb2c";

generateBlockWithAttributesGeneral("form", "form", formColor);
generateBlockWithAttributesGeneral("label", "label", formColor);

Blockly.JavaScript[`type`] = function (block) {
  blockyValidation(block);
  var opt = block.getFieldValue("option");
  return `type= "${opt}" `;
};

//input
Blockly.Blocks["input"] = {
  init: function () {
    this.appendValueInput("attribute").setCheck(null).appendField("input");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(formColor);
    this.setTooltip(`${descriptionBlock.get("input")}`);
  },
};

Blockly.JavaScript["input"] = function (block) {
  blockyValidation(block);
  var attributeBlock = block.getInputTargetBlock("attribute");
  var attributes = Blockly.JavaScript.blockToCode(attributeBlock);
  if (attributes) {
    return `<input ${attributes} />`;
  }
  return `<input />`;
};
