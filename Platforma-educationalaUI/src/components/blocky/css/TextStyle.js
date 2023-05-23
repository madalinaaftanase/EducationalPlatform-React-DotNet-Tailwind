import { generateDropDownBlockGeneral, generateInputBlockGeneral } from "./functionsCreateBlocks";
const textStyleColor = "#f77997";

generateInputBlockGeneral("font-size", textStyleColor);
generateInputBlockGeneral("font-family", textStyleColor);
generateInputBlockGeneral("font-weight", textStyleColor);
generateInputBlockGeneral("color", textStyleColor);
generateInputBlockGeneral("text-align", textStyleColor);
generateInputBlockGeneral("line-height", textStyleColor);

const textDecoration = [
  ["none", "none"],
  ["underline", "underline"],
  ["overline", "overline"],
  ["line-through", "line-through"],
  ["blink", "blink"],
];
generateDropDownBlockGeneral("text-decoration", textDecoration, textStyleColor);

const textAlign = [
  ["left", "left"],
  ["center", "center"],
  ["right", "right"],
  ["justify", "justify"],
];
generateDropDownBlockGeneral("text-align", textAlign, textStyleColor);
