import {
  generateGeneralBlockWithAttributes,
  generateGeneralBlockWithAttributesJS,
} from "./functionsCreateBlocks";

function getColor() {
  return "#4fc0c4";
}

generateGeneralBlockWithAttributes("table", getColor());
generateGeneralBlockWithAttributesJS("table", "table");

generateGeneralBlockWithAttributes("td", getColor());
generateGeneralBlockWithAttributesJS("td", "td");

generateGeneralBlockWithAttributes("th", getColor());
generateGeneralBlockWithAttributesJS("th", "th");

generateGeneralBlockWithAttributes("thead", getColor());
generateGeneralBlockWithAttributesJS("thead", "thead");

generateGeneralBlockWithAttributes("tbody", getColor());
generateGeneralBlockWithAttributesJS("tbody", "tbody");

generateGeneralBlockWithAttributes("tr", getColor());
generateGeneralBlockWithAttributesJS("tr", "tr");

generateGeneralBlockWithAttributes("caption", getColor());
generateGeneralBlockWithAttributesJS("caption", "caption");
