import {
  generateDropDownAndInputBlockGeneral,
  generateInputBlockGeneral,
} from "./functionsCreateBlocks";


const spacingColor = "#f7ad45";

let marginOptions = [
  ["margin", "margin"],
  ["margin-top", "margin-top"],
  ["margin-left", "margin-left"],
  ["margin-right", "margin-right"],
];

let paddingOptions = [
  ["padding", "padding"],
  ["padding-top", "padding-top"],
  ["padding-left", "padding-left"],
  ["padding-right", "padding-right"],
];

generateDropDownAndInputBlockGeneral("margin", marginOptions, spacingColor);
generateDropDownAndInputBlockGeneral("padding", paddingOptions, spacingColor);
generateInputBlockGeneral("gap", spacingColor);

