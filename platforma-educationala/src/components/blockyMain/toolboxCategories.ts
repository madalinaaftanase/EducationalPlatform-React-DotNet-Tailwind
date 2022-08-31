export const toolboxCategories = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "HTML",
      contents: [
        {
          kind: "category",
          name: "Base Frame",
          colour: "#f22010",
          contents: [
            {
              kind: "block",
              type: "document",
            },
            {
              kind: "block",
              type: "header",
            },
            {
              kind: "block",
              type: "content",
            },
          ],
        },
        {
          kind: "category",
          name: "Basics",
          colour: "#f26110",
          contents: [
            {
              kind: "block",
              type: "div",
            },
            {
              kind: "block",
              type: "regexInput",
            },
            {
              kind: "block",
              type: "h",
            },
            {
              kind: "block",
              type: "paragraph",
            },
            {
              kind: "block",
              type: "br",
            },
          ],
        },
        {
          kind: "category",
          name: "Lists",
          colour: "#4fc488",
          contents: [
            {
              kind: "block",
              type: "ul",
            },
            {
              kind: "block",
              type: "ol",
            },
            {
              kind: "block",
              type: "li",
            },
            {
              kind: "sep",
              gap: "10",
            },
            {
              kind: "block",
              type: "dd",
            },
            {
              kind: "block",
              type: "dt",
            },
            {
              kind: "block",
              type: "dl",
            },
          ],
        },
      ],
    },
    {
      kind: "sep",
      gap: "100",
    },
    {
      kind: "category",
      name: "CSS",
      contents: [
        {
          kind: "category",
          name: "Basic",
          colour: "#e32db6",
          contents: [
            {
              kind: "block",
              type: "any",
            },
            {
              kind: "block",
              type: "style",
            },
            {
              kind: "block",
              type: "color",
            },
            {
              kind: "block",
              type: "background-color",
            },
            {
              kind: "block",
              type: "font-size",
            },
            {
              kind: "block",
              type: "display",
            },
            {
              kind: "block",
              type: "gap",
            },
            {
              kind: "block",
              type: "margin",
            },
            {
              kind: "block",
              type: "padding",
            },
            {
              kind: "block",
              type: "border",
            },
          ],
        },
        {
          kind: "category",
          name: "Grid",
          colour: "#66eda1",
          contents: [
            {
              kind: "block",
              type: "display",
            },
            {
              kind: "block",
              type: "gap",
            },
            {
              kind:"block",
              type:"grid-gap"
            },
            {
              kind:"block",
              type:"grid-template-rows"
            },
            {
              kind:"block",
              type:"grid-template-columns"
            },
            {
              kind:"label",
              text:"Pozitionare"
            },
            {
              kind:"block",
              type:"grid-area"
            },
            {
              kind:"block",
              type:"grid-row"
            },
            {
              kind:"block",
              type:"grid-column"
            },
            {
              kind:"block",
              type:"grid-position"
            },
          ],
        },
        {
          kind: "category",
          name: "Flex",
          colour: "#4fc0c4",
          contents: [
            {
              kind: "block",
              type: "display",
            },
            {
              kind: "block",
              type: "gap",
            },
            {
              kind: "block",
              type: "flex-direction",
            },
            {
              kind: "block",
              type: "flex-flow",
            },
            {
              kind: "block",
              type: "flex-wrap",
            },
          ],
        },
        {
          kind: "category",
          name: "Border",
          colour: "#d266ed",
          contents: [
            {
              kind: "block",
              type: "border",
            },
            {
              kind: "block",
              type: "border-color",
            },
            {
              kind: "block",
              type: "border-radius",
            },
            {
              kind: "block",
              type: "borderStyle",
            },
            {
              kind: "block",
              type: "borderWidth",
            },
          ],
        },
      ],
    },
  ],
};
