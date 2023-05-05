import Blockly from "blockly";
import { generateGeneralBlock, generateGeneralBlockJS } from "./functionsBlocks";

function getColor() {
  return "#4fc0c4";
}

generateGeneralBlock("table", getColor());
generateGeneralBlockJS("table", "table");

generateGeneralBlock("td", getColor());
generateGeneralBlockJS("td", "td");

generateGeneralBlock("th", getColor());
generateGeneralBlockJS("th", "th");

generateGeneralBlock("thead", getColor());
generateGeneralBlockJS("thead", "thead");

generateGeneralBlock("tbody", getColor());
generateGeneralBlockJS("tbody", "tbody");

generateGeneralBlock("tr", getColor());
generateGeneralBlockJS("tr", "tr");

generateGeneralBlock("caption", getColor());
generateGeneralBlockJS("caption", "caption");
