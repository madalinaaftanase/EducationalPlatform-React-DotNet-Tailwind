import {
  generateDropDownAndInputBlockGeneral,
  generateInputBlockGeneral,
} from "./functionsCreateBlocks";

const gridColor = "#66eda1";

let gapOptions = [
  ["grid-row-gap", "grid-row-gap"],
  ["grid-column-gap", "grid-column-gap"],
  ["grid-gap", "grid-gap"],
];

let posOptions = [
  ["grid-row-start", "grid-row-start"],
  ["grid-row-end", "grid-row-end"],
  ["grid-column-start", "grid-column-start"],
  ["grid-column-end", "grid-column-end"],
];

generateDropDownAndInputBlockGeneral("grid-gap", gapOptions, gridColor);
generateDropDownAndInputBlockGeneral("grid-position", posOptions, gridColor);

generateInputBlockGeneral("grid-auto-rows", gridColor);
generateInputBlockGeneral("grid-auto-flow", gridColor);
generateInputBlockGeneral("grid-template-rows", gridColor);
generateInputBlockGeneral("grid-template-columns", gridColor);
generateInputBlockGeneral("grid-area", gridColor);
generateInputBlockGeneral("grid-row", gridColor);
generateInputBlockGeneral("grid-column", gridColor);



