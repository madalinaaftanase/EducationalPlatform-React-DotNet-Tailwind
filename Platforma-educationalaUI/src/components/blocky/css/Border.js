import {
  generateDoubleDropDownBlockGeneral,
  generateInputBlockGeneral,
} from "./functionsCreateBlocks";

const borderColor = "#d266ed";

generateInputBlockGeneral("border-color", borderColor);
generateInputBlockGeneral("border-radius", borderColor);

//borders
let borderStyleTypes = [
  ["border-style", "border-style"],
  ["border-left-style", "border-left-style"],
  ["border-right-style", "border-right-style"],
  ["border-top-style", "border-top-style"],
  ["border-bottom-style", "border-bottom-style"],
];

let borderStyleOptions = [
  ["none", "none"],
  ["hidden", "hidden"],
  ["dotted", "dotted"],
  ["dashed", "dashed"],
  ["solid", "solid"],
  ["double", "double"],
  ["groove", "groove"],
  ["ridge", "ridge"],
  ["inset", "inset"],
  ["outset", "outset"],
  ["initial", "initial"],
  ["inherit", "inherit"],
];

let borderWidthTypes = [
  ["border-width", "border-width"],
  ["border-left-width", "border-left-width"],
  ["border-right-width", "border-right-width"],
  ["border-top-width", "border-top-width"],
  ["border-bottom-width", "border-bottom-width"],
];

let borderWidthOptions = [
  ["medium", "medium"],
  ["thin", "thin"],
  ["thick", "thick"],
];

generateDoubleDropDownBlockGeneral("borderStyle", borderStyleTypes, borderStyleOptions, borderColor);
generateDoubleDropDownBlockGeneral("borderWidth", borderWidthTypes, borderWidthOptions, borderColor);
