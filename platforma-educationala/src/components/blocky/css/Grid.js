import {
    generateInputsBlock,
    generateInputsBlockJS,
    generateDropDownBlock,
    generateDropDownBlockJS,
    generateDropDownAndInputBlock,
    generateDropDownAndInputBlockJS,
    generateDoubleInputsBlock,
    generateDoubleInputsBlockJS,
  } from "./functionsCreateBlocks";

const gridColor ='#66eda1';
const text="lalal"
//https://learncssgrid.com/

let gapOptions =[
    ["grid-row-gap","grid-row-gap"],
    ["grid-column-gap","grid-column-gap"],
    ["grid-gap","grid-gap"],
]

generateDropDownAndInputBlock("grid-gap", gapOptions, gridColor);
generateDropDownAndInputBlockJS("grid-gap");

generateInputsBlock("grid-auto-rows", text, gridColor);
generateInputsBlockJS("grid-auto-rows");

generateInputsBlock("grid-auto-flow", text, gridColor);
generateInputsBlockJS("grid-auto-flow");
//pozitionare
generateInputsBlock("grid-template-rows", text, gridColor);
generateInputsBlockJS("grid-template-rows");

generateInputsBlock("grid-template-columns", text, gridColor);
generateInputsBlockJS("grid-template-columns");

generateInputsBlock("grid-area", text, gridColor);
generateInputsBlockJS("grid-area");

generateInputsBlock("grid-row", text, gridColor);
generateInputsBlockJS("grid-row");

generateInputsBlock("grid-column", text, gridColor);
generateInputsBlockJS("grid-column");

let posOptions =[
    ["grid-row-start","grid-row-start"],
    ["grid-row-end","grid-row-end"],
    ["grid-column-start","grid-column-start"],
    ["grid-column-end","grid-column-end"],
]

generateDropDownAndInputBlock("grid-position", posOptions, gridColor);
generateDropDownAndInputBlockJS("grid-position");