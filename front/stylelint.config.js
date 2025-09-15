export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-order"],
  rules: {
    // Forçar ordem consistente de propriedades
    "order/properties-order": [
      [
        // Box model
        "display",
        "position",
        "top",
        "right",
        "bottom",
        "left",
        "z-index",
        "flex",
        "flex-grow",
        "flex-shrink",
        "flex-basis",
        "align-items",
        "justify-content",
        "width",
        "min-width",
        "max-width",
        "height",
        "min-height",
        "max-height",
        "margin",
        "padding",

        // Tipografia
        "font",
        "font-family",
        "font-size",
        "font-weight",
        "line-height",
        "text-align",
        "color",

        // Background e borda
        "background",
        "background-color",
        "border",
        "border-radius",

        // Outros
        "box-shadow",
        "opacity",
        "transition",
      ],
      {
        unspecified: "bottomAlphabetical",
      },
    ],

    // Preferir aspas duplas em strings
    "string-quotes": "double",

    // Não permitir linhas em branco antes de uma declaração
    "declaration-empty-line-before": "never",
  },
};
