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
      colour: "#f7ad45",
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
        {
          kind: "block",
          type: "mark",
        },
        {
          kind: "block",
          type: "em",
        },
        {
          kind: "block",
          type: "i",
        },
        {
          kind: "block",
          type: "big",
        },
        {
          kind: "block",
          type: "small",
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
      name: "Formular",
      colour: "#d266ed",
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
        {
          kind: "block",
          type: "button",
        },
        {
          kind: "block",
          type: "option",
        },
        {
          kind: "block",
          type: "select",
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
    {
      kind: "category",
      name: "Multimedia",
      colour: "#5f96c9",
      expanded: "true",
      contents: [
        {
          kind: "block",
          type: "figure",
        },
        {
          kind: "block",
          type: "figcaption",
        },
        {
          kind: "block",
          type: "audio",
        },
        {
          kind: "block",
          type: "video",
        },
        {
          kind: "block",
          type: "img",
        },
      ],
    },
    {
      kind: "category",
      name: "Organizare",
      colour: "#f2e018",
      expanded: "true",
      contents: [
        {
          kind: "block",
          type: "div",
        },
        {
          kind: "block",
          type: "article",
        },
        {
          kind: "block",
          type: "section",
        },
        {
          kind: "block",
          type: "nav",
        },
        {
          kind: "block",
          type: "header",
        },
        {
          kind: "block",
          type: "aside",
        },
        {
          kind: "block",
          type: "main",
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
          type: "background-color",
        },
        {
          kind: "block",
          type: "display",
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
      name: "Bordura",
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
    {
      kind: "category",
      name: "Spatiere",
      colour: "#f7ad45",
      expanded: "true",
      contents: [
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
          type: "gap",
        },
      ],
    },
    {
      kind: "category",
      name: "Stilizare text",
      colour: "#f77997",
      expanded: "true",
      contents: [
        {
          kind: "block",
          type: "font-size",
        },
        {
          kind: "block",
          type: "font-family",
        },
        {
          kind: "block",
          type: "font-weight",
        },
        {
          kind: "block",
          type: "color",
        },
        {
          kind: "block",
          type: "text-align",
        },
        {
          kind: "block",
          type: "text-decoration",
        },
        {
          kind: "block",
          type: "line-height",
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
      colour: "#4fc0c4",
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
          type: "Set Timeout",
        },
        {
          kind: "block",
          type: "Set Interval"
        },
      ]
    },
    {
      kind: "category",
      name: "Evenimente Mouse",
      colour: "#4fc0f4",
      expanded: "true",
      contents: [{
        kind: "block",
        type: "onClick",
      },
      {
        kind: "block",
        type: "onMouseDown",
      },
      {
        kind: "block",
        type: "onMouseEnter",
      },
      {
        kind: "block",
        type: "onMouseLeave",
      },
      {
        kind: "block",
        type: "onMouseMove",
      },
      {
        kind: "block",
        type: "onMouseOut",
      },
      {
        kind: "block",
        type: "onMouseOver",
      },
      {
        kind: "block",
        type: "onMouseUp",
      },]
    },
    {
      kind: "category",
      name: "Modificare de continut",
      colour: "#f7ad45",
      expanded: "true",
      contents: [{
        kind: "block",
        type: "inner html",
      },
      {
        kind: "block",
        type: "regexInput",
      },]
    },
    {
      kind: "category",
      name: "Stilizare",
      colour: "#4440f4",
      expanded: "true",
      contents: [{
        kind: "block",
        type: "styleProp",
      },
      ]
    }
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
