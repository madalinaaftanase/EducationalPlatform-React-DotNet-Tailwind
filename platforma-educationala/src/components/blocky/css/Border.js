import {
    generateInputsBlock,
    generateInputsBlockJS,
    generateDoubleDropDownBlock,
    generateDoubleDropDownBlockJS,
  } from "./functionsCreateBlocks";

  const borderColor='#d266ed';
  const text ="ceva";

  //border-color
generateInputsBlock("border-color", text, borderColor);
generateInputsBlockJS("border-color");

//border-radius
generateInputsBlock("border-radius", text, borderColor);
generateInputsBlockJS("border-radius");

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
  
  generateDoubleDropDownBlock(
    "borderStyle",
    borderStyleTypes,
    borderStyleOptions,
    borderColor
  );
  generateDoubleDropDownBlockJS("borderStyle");
  
  generateDoubleDropDownBlock(
    "borderWidth",
    borderWidthTypes,
    borderWidthOptions,
    borderColor
  );
  generateDoubleDropDownBlockJS("borderWidth");
