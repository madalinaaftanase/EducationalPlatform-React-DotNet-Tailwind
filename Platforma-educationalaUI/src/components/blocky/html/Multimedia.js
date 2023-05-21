import {
  generateBlockWithAttributesGeneral,
  generateInlineBlockGeneral,
} from "./functionsCreateBlocks";

const multimediaColor = "#5f96c9";
generateInlineBlockGeneral("img", "img", multimediaColor);
generateBlockWithAttributesGeneral("video", "video", multimediaColor);
generateBlockWithAttributesGeneral("audio", "audio", multimediaColor);
generateBlockWithAttributesGeneral("figure", "figure", multimediaColor);
generateBlockWithAttributesGeneral("figcaption", "figcaption", multimediaColor);
