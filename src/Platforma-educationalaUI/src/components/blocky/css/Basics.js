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

const text = "face ceva";
const basicColor = "#e32db6";

//double text
generateDoubleInputsBlock("any", text, "#040806");
generateDoubleInputsBlockJS("any");

//color
generateInputsBlock("color", text, basicColor);
generateInputsBlockJS("color");

//bg-color
generateInputsBlock("background-color", text, basicColor);
generateInputsBlockJS("background-color");

//font-size
generateInputsBlock("font-size", text, basicColor);
generateInputsBlockJS("font-size");

//height
generateInputsBlock("height", text, basicColor);
generateInputsBlockJS("height");

//width
generateInputsBlock("width", text, basicColor);
generateInputsBlockJS("width");

//z-index
generateInputsBlock("z-index", text, basicColor);
generateInputsBlockJS("z-index");

//border
generateInputsBlock("border", text, basicColor);
generateInputsBlockJS("border");

//gap
generateInputsBlock("gap", text, basicColor);
generateInputsBlockJS("gap");

//display
let optionsDisplay = [
  ["inline", "inline"],
  ["flex", "flex"],
  ["grid", "grid"],
  ["block", "block"],
  ["none", "none"],
];

generateDropDownBlock("display", optionsDisplay, basicColor);
generateDropDownBlockJS("display");

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

generateDropDownAndInputBlock("margin", marginOptions, basicColor);
generateDropDownAndInputBlockJS("margin");

generateDropDownAndInputBlock("padding", paddingOptions, basicColor);
generateDropDownAndInputBlockJS("padding");

//justify and align self
let alignOptions = [
  ["auto", "auto"],
  ["normal", "normal"],
  ["start", "start"],
  ["end", "end"],
  ["center", "center"],
  ["stretch", "stretch"],
  ["baseline", "baseline"],
];
generateDropDownBlock("justify-self", alignOptions, basicColor);
generateDropDownBlockJS("justify-self");

generateDropDownBlock("align-self", alignOptions, basicColor);
generateDropDownBlockJS("align-self");

//justify and align content
let alignContentOptions = [
  ["baseline", "baseline"],
  ["space-between", "space-between"],
  ["space-around", "space-around"],
  ["auto", "auto"],
  ["normal", "normal"],
  ["start", "start"],
  ["end", "end"],
  ["center", "center"],
  ["stretch", "stretch"],
];
generateDropDownBlock("justify-content", alignContentOptions, basicColor);
generateDropDownBlockJS("justify-content");

generateDropDownBlock("align-content", alignContentOptions, basicColor);
generateDropDownBlockJS("align-content");
