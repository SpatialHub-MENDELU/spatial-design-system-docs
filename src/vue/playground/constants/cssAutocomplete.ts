export const pseudoClassesCSS = [
  "active", "after", "any-link", "autofill", "backdrop", "before",
  "checked", "cue", "default", "defined", "disabled", "empty",
  "enabled", "file-selector-button", "first", "first-child",
  "first-letter", "first-line", "first-of-type", "focus",
  "focus-visible", "focus-within", "fullscreen", "has", "host",
  "host-context", "hover", "in-range", "indeterminate", "invalid",
  "is", "lang", "last-child", "last-of-type", "left", "link", "marker",
  "modal", "not", "nth-child", "nth-last-child", "nth-last-of-type",
  "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range",
  "part", "placeholder", "placeholder-shown", "read-only", "read-write",
  "required", "right", "root", "scope", "selection", "slotted", "target",
  "target-text", "valid", "visited", "where"
].map(name => ({ type: "class", value: name }));

export const valuesCSS = [
  "above", "absolute", "activeborder", "additive", "activecaption", "after-white-space",
  "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always",
  "antialiased", "appworkspace", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column",
  "avoid-page", "avoid-region", "axis-pan", "background", "backwards", "baseline", "below",
  "bidi-override", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box",
  "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel",
  "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "capitalize",
  "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle",
  "cjk-decimal", "clear", "clip", "close-quote", "col-resize", "collapse", "color", "color-burn",
  "color-dodge", "column", "column-reverse", "compact", "condensed", "contain", "content",
  "contents", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover",
  "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal",
  "decimal-leading-zero", "default", "default-button", "dense", "destination-atop", "destination-in",
  "destination-out", "destination-over", "difference", "disc", "discard", "disclosure-closed",
  "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize",
  "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end",
  "ethiopic-abegede-gez", "ethiopic-halehame-aa-er", "ethiopic-halehame-gez", "ew-resize", "exclusion",
  "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fill-box",
  "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes", "forwards", "from",
  "geometricPrecision", "graytext", "grid", "groove", "hand", "hard-light", "help", "hidden", "hide",
  "higher", "highlight", "highlighttext", "horizontal", "hsl", "hsla", "hue", "icon", "ignore",
  "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext",
  "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-grid",
  "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "justify", "keep-all",
  "landscape", "large", "larger", "left", "level", "lighter", "lighten", "line-through", "linear",
  "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower",
  "lower-hexadecimal", "lower-latin", "lower-norwegian", "lowercase", "ltr", "luminosity", "manipulation",
  "match", "matrix", "matrix3d", "medium", "menu", "menutext", "message-box", "middle", "min-intrinsic",
  "mix", "monospace", "move", "multiple", "multiple_mask_images", "multiply", "n-resize", "narrower",
  "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none",
  "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize",
  "oblique", "opacity", "open-quote", "optimizeLegibility", "optimizeSpeed", "outset", "outside",
  "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused",
  "perspective", "pinch-zoom", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait",
  "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio",
  "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat",
  "repeating-linear-gradient", "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse",
  "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round",
  "row", "row-resize", "row-reverse", "rtl", "run-in", "running", "s-resize", "sans-serif", "saturation",
  "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen", "scroll", "scrollbar", "scroll-position",
  "se-resize", "self-start", "self-end", "semi-condensed", "semi-expanded", "separate", "serif", "show",
  "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal",
  "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps",
  "small-caption", "smaller", "soft-light", "solid", "source-atop", "source-in", "source-out",
  "source-over", "space", "space-around", "space-between", "space-evenly", "spell-out", "square", "start",
  "static", "status-bar", "stretch", "stroke", "stroke-box", "sub", "subpixel-antialiased", "svg_masks",
  "super", "sw-resize", "symbolic", "symbols", "system-ui", "table", "table-caption", "table-cell",
  "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row",
  "table-row-group", "text", "text-bottom", "text-top", "textarea", "textfield", "thick", "thin",
  "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "to", "top",
  "transform", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent",
  "ultra-condensed", "ultra-expanded", "underline", "unidirectional-pan", "unset", "up", "upper-latin",
  "uppercase", "url", "var", "vertical", "vertical-text", "view-box", "visible", "visibleFill",
  "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe",
  "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor", "xx-large", "xx-small"
].map(name => ({ type: "keyword", value: name })).concat([
  "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige",
  "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown",
  "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue",
  "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod",
  "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen",
  "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
  "darkslateblue", "darkslategray", "darkturquoise", "darkviolet",
  "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick",
  "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite",
  "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew",
  "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender",
  "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral",
  "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink",
  "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray",
  "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta",
  "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple",
  "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise",
  "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin",
  "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered",
  "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred",
  "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue",
  "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown",
  "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue",
  "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan",
  "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white",
  "whitesmoke", "yellow", "yellowgreen"
].map(name => ({ type: "constant", value: name })));

export const tagsCSS = [
  "a", "abbr", "address", "article", "aside", "b", "bdi", "bdo", "blockquote", "body",
  "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "dd", "del",
  "details", "dfn", "dialog", "div", "dl", "dt", "em", "figcaption", "figure", "footer",
  "form", "header", "hgroup", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "html", "i", "iframe",
  "img", "input", "ins", "kbd", "label", "legend", "li", "main", "meter", "nav", "ol", "output",
  "p", "pre", "ruby", "section", "select", "small", "source", "span", "strong", "sub", "summary",
  "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "tr", "u", "ul"
].map(name => ({ type: "type", value: name }));

export const atRulesCSS = [
  "@charset", "@color-profile", "@container", "@counter-style", "@font-face", "@font-feature-values",
  "@font-palette-values", "@import", "@keyframes", "@layer", "@media", "@namespace", "@page",
  "@position-try", "@property", "@scope", "@starting-style", "@supports", "@view-transition"
].map(value => ({ type: "keyword", value }));