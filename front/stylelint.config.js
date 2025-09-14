/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  plugins: ["stylelint-order"],
  rules: {
    // Regras básicas recomendadas
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "layer", "variants", "responsive"],
      },
    ],
    "no-empty-source": null,
    "block-no-empty": true,
    "color-hex-length": "short",

    // Tailwind e CSS custom properties
    "declaration-block-no-redundant-longhand-properties": null,

    // Ordem das propriedades
    "order/properties-order": [
      [
        {
          groupName: "positioning",
          properties: ["position", "top", "right", "bottom", "left", "z-index"],
        },
        {
          groupName: "box-model",
          properties: [
            "display",
            "flex",
            "flex-grow",
            "flex-shrink",
            "flex-basis",
            "flex-direction",
            "flex-wrap",
            "grid",
            "grid-template",
            "grid-template-rows",
            "grid-template-columns",
            "grid-row",
            "grid-column",
            "grid-auto-rows",
            "grid-auto-columns",
            "grid-auto-flow",
            "gap",
            "align-items",
            "justify-items",
            "align-self",
            "justify-self",
            "width",
            "min-width",
            "max-width",
            "height",
            "min-height",
            "max-height",
            "margin",
            "padding",
          ],
        },
        {
          groupName: "typography",
          properties: [
            "font",
            "font-family",
            "font-size",
            "font-weight",
            "line-height",
            "letter-spacing",
            "text-align",
            "text-transform",
            "color",
          ],
        },
        {
          groupName: "visual",
          properties: [
            "background",
            "background-color",
            "background-image",
            "background-position",
            "background-repeat",
            "background-size",
            "border",
            "border-radius",
            "box-shadow",
            "opacity",
          ],
        },
        {
          groupName: "animation",
          properties: ["transition", "transform", "animation"],
        },
      ],
      { unspecified: "bottomAlphabetical" },
    ],
  },
};
