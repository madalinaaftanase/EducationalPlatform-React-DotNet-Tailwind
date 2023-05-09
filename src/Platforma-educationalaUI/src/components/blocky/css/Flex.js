import {
  generateDropDownBlock,
  generateDropDownBlockJS,
} from "./functionsCreateBlocks";

const flexColor='#4fc0c4'

let flexDirection = [
  ["row", "row"],
  ["row-reverse", "row-reverse"],
  ["column", "column"],
  ["column-reverse", "column-reverse"],
  ["initial", "initial"],
  ["inherit", "inherit"],
];

generateDropDownBlock("flex-direction", flexDirection, flexColor);
generateDropDownBlockJS("flex-direction");

generateDropDownBlock("flex-flow", flexDirection, flexColor);
generateDropDownBlockJS("flex-flow");

let flexWrap = [
  ["nowrap", "nowrap"],
  ["wrap", "wrap"],
  ["wrap-reverse", "wrap-reverse"],
  ["initial", "initial"],
  ["inherit", "inherit"],
];
generateDropDownBlock("flex-wrap", flexWrap, flexColor);
generateDropDownBlockJS("flex-wrap");
