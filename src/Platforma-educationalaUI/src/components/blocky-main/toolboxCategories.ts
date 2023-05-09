const htmlCategories = {
  kind: "category",
  name: "HTML",
  expanded: "true",
  contents: [
    {
      kind: "category",
      name: "Structura",
      colour: "#f22010",
      expanded: "true",
      contents: [
        {
          kind: "block",
          type: "document",
        },
        {
          kind: "block",
          type: "head",
        },
        {
          kind: "block",
          type: "body",
        },
        {
          kind: "block",
          type: "footer",
        },
        {
          kind: "block",
          type: "title",
        }
      ],
    },

    {
      kind: "category",
      name: "Atribute",
      colour: "#84a671",
      expanded: "true",
      contents: [
        {
          kind: "block",
          type: "attributes",
        },
        {
          kind: "block",
          type: "style",
        },
        {
          kind: "block",
          type: "id",
        },
        {
          kind: "block",
          type: "type",
        },
        {
          kind: "block",
          type: "heightAttr",
        },
        {
          kind: "block",
          type: "src",
        },
        {
          kind: "block",
          type: "alt",
        },
        {
          kind: "block",
          type: "parameter",
        },
      ]
    },
    {
      kind: "category",
      name: "Formatare text",
      colour: "#f26110",
      expanded: "true",
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
        {
          kind: "block",
          type: "strong",
        },
        {
          kind: "block",
          type: "u",
        },
      ],
    },
    {
      kind: "category",
      name: "Liste",
      colour: "#4fc488",
      expanded: "true",
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
    {
      kind: "category",
      name: "Formulare",
      colour: "#dedb2c",
      expanded: "true",
      contents: [
        {
          kind: "block",
          type: "form",
        },
        {
          kind: "block",
          type: "input",
        },
        {
          kind: "block",
          type: "label",
        },
      ],
    },
    {
      kind: "category",
      name: "Tabele",
      colour: "#4fc0c4",
      expanded: "true",
      contents: [
        {
          kind: "block",
          type: "table",
        },
        {
          kind: "block",
          type: "td",
        },
        {
          kind: "block",
          type: "tr",
        },
        {
          kind: "block",
          type: "th",
        },
        {
          kind: "block",
          type: "thead",
        },

        {
          kind: "block",
          type: "tbody",
        },
        {
          kind: "block",
          type: "caption",
        },
      ],
    },
  ],
}

const cssCategories = {
  kind: "category",
  name: "CSS",
  expanded: "true",
  contents: [
    {
      kind: "category",
      name: "De baza",
      colour: "#e32db6",
      expanded: "true",
      contents: [
        {
          kind: "block",
          type: "any",
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
          type: "height",
        },
        {
          kind: "block",
          type: "width",
        },
        {
          kind: "block",
          type: "z-index",
        },
        {
          kind: "block",
          type: "border",
        },
        {
          kind: "block",
          type: "justify-self",
        },
        {
          kind: "block",
          type: "align-self",
        },
        {
          kind: "block",
          type: "justify-content",
        },
        {
          kind: "block",
          type: "align-content",
        },
      ],
    },
    {
      kind: "category",
      name: "Grid",
      colour: "#66eda1",
      expanded: "true",
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
          type: "grid-gap",
        },
        {
          kind: "block",
          type: "grid-template-rows",
        },
        {
          kind: "block",
          type: "grid-template-columns",
        },
        {
          kind: "block",
          type: "grid-auto-rows",
        },
        {
          kind: "block",
          type: "grid-auto-flow",
        },
        {
          kind: "label",
          text: "Pozitionare",
        },
        {
          kind: "block",
          type: "grid-area",
        },
        {
          kind: "block",
          type: "grid-row",
        },
        {
          kind: "block",
          type: "grid-column",
        },
        {
          kind: "block",
          type: "grid-position",
        },
      ],
    },
    {
      kind: "category",
      name: "Flex",
      colour: "#4fc0c4",
      expanded: "true",
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
      expanded: "true",
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
}

const javascriptCategories =
{
  kind: "category",
  name: "JS",
  expanded: "true",
  contents: [
    {
      kind: "category",
      name: "De baza",
      colour: "`#4fc0c4",
      expanded: "true",
      contents: [
        {
          kind: "block",
          type: "script",
        },
        {
          kind: "block",
          type: "GetElementById",
        },
        {
          kind: "block",
          type: "OnClick",
        },
      ]
    },
  ],
}

const separator = {
  kind: "sep",
  gap: "100",
}

export const toolboxCategories = {
  kind: "categoryToolbox",
  contents: [
    htmlCategories,
    separator,
    cssCategories,
    separator,
    javascriptCategories
  ],
};
