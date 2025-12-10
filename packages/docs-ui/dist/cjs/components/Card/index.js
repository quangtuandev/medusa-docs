"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const react_1 = __importDefault(require("react"));
const Default_1 = require("./Layout/Default");
const Large_1 = require("./Layout/Large");
const Filler_1 = require("./Layout/Filler");
const Mini_1 = require("./Layout/Mini");
const Card = ({ type = "default", ...props }) => {
    switch (type) {
        case "large":
            return react_1.default.createElement(Large_1.CardLargeLayout, { ...props });
        case "filler":
            return react_1.default.createElement(Filler_1.CardFillerLayout, { ...props });
        case "mini":
            return react_1.default.createElement(Mini_1.CardLayoutMini, { ...props });
        default:
            return react_1.default.createElement(Default_1.CardDefaultLayout, { ...props });
    }
};
exports.Card = Card;
