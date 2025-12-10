"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomImg = void 0;
const react_1 = __importDefault(require("react"));
const react_medium_image_zoom_1 = __importDefault(require("react-medium-image-zoom"));
require("react-medium-image-zoom/dist/styles.css");
const ZoomImg = (props) => {
    return (react_1.default.createElement(react_medium_image_zoom_1.default, { wrapElement: "span" },
        react_1.default.createElement("img", { ...props })));
};
exports.ZoomImg = ZoomImg;
