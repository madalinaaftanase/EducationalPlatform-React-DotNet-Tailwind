import { generateDropDownBlockGeneral } from "./functionsCreateBlocks";

const flexColor = "#4fc0c4";
let flexDirection = [
  ["row", "row"],
  ["row-reverse", "row-reverse"],
  ["column", "column"],
  ["column-reverse", "column-reverse"],
  ["initial", "initial"],
  ["inherit", "inherit"],
];

let flexWrap = [
  ["nowrap", "nowrap"],
  ["wrap", "wrap"],
  ["wrap-reverse", "wrap-reverse"],
  ["initial", "initial"],
  ["inherit", "inherit"],
];

generateDropDownBlockGeneral("flex-direction", flexDirection, flexColor);
generateDropDownBlockGeneral("flex-flow", flexDirection, flexColor);
generateDropDownBlockGeneral("flex-wrap", flexWrap, flexColor);
