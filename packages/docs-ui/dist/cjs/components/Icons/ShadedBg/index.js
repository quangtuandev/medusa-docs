"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadedBgIcon = void 0;
const react_1 = __importStar(require("react"));
const ShadedBgIcon = ({ variant = "blue", ...props }) => {
    const color = (0, react_1.useMemo)(() => {
        switch (variant) {
            case "neutral":
            case "code":
                return "var(--docs-tags-neutral-border)";
            case "blue":
                return "var(--docs-tags-blue-border)";
            case "purple":
                return "var(--docs-tags-purple-border)";
            case "green":
                return "var(--docs-tags-green-border)";
            case "orange":
                return "var(--docs-tags-orange-border)";
            case "red":
                return "var(--docs-tags-red-border)";
        }
    }, [variant]);
    return (react_1.default.createElement("svg", { fill: "none", xmlns: "http://www.w3.org/2000/svg", height: "100%", width: "100%", ...props },
        react_1.default.createElement("g", { clipPath: "url(#clip0_10402_37468)" },
            react_1.default.createElement("rect", { x: "32.3379", y: "-66.5442", width: "1.5", height: "96", transform: "rotate(45 32.3379 -66.5442)", fill: color }),
            react_1.default.createElement("rect", { x: "34.813", y: "-64.0694", width: "1.5", height: "96", transform: "rotate(45 34.813 -64.0694)", fill: color }),
            react_1.default.createElement("rect", { x: "37.2876", y: "-61.5945", width: "1.5", height: "96", transform: "rotate(45 37.2876 -61.5945)", fill: color }),
            react_1.default.createElement("rect", { x: "39.7627", y: "-59.1196", width: "1.5", height: "96", transform: "rotate(45 39.7627 -59.1196)", fill: color }),
            react_1.default.createElement("rect", { x: "42.2373", y: "-56.6447", width: "1.5", height: "96", transform: "rotate(45 42.2373 -56.6447)", fill: color }),
            react_1.default.createElement("rect", { x: "44.7124", y: "-54.1699", width: "1.5", height: "96", transform: "rotate(45 44.7124 -54.1699)", fill: color }),
            react_1.default.createElement("rect", { x: "47.187", y: "-51.695", width: "1.5", height: "96", transform: "rotate(45 47.187 -51.695)", fill: color }),
            react_1.default.createElement("rect", { x: "49.6621", y: "-49.2201", width: "1.5", height: "96", transform: "rotate(45 49.6621 -49.2201)", fill: color }),
            react_1.default.createElement("rect", { x: "52.1367", y: "-46.7452", width: "1.5", height: "96", transform: "rotate(45 52.1367 -46.7452)", fill: color }),
            react_1.default.createElement("rect", { x: "54.6118", y: "-44.2704", width: "1.5", height: "96", transform: "rotate(45 54.6118 -44.2704)", fill: color }),
            react_1.default.createElement("rect", { x: "57.0869", y: "-41.7955", width: "1.5", height: "96", transform: "rotate(45 57.0869 -41.7955)", fill: color }),
            react_1.default.createElement("rect", { x: "59.5615", y: "-39.3206", width: "1.5", height: "96", transform: "rotate(45 59.5615 -39.3206)", fill: color }),
            react_1.default.createElement("rect", { x: "62.0366", y: "-36.8458", width: "1.5", height: "96", transform: "rotate(45 62.0366 -36.8458)", fill: color }),
            react_1.default.createElement("rect", { x: "64.5112", y: "-34.3709", width: "1.5", height: "96", transform: "rotate(45 64.5112 -34.3709)", fill: color }),
            react_1.default.createElement("rect", { x: "66.9863", y: "-31.896", width: "1.5", height: "96", transform: "rotate(45 66.9863 -31.896)", fill: color }),
            react_1.default.createElement("rect", { x: "69.4609", y: "-29.4211", width: "1.5", height: "96", transform: "rotate(45 69.4609 -29.4211)", fill: color }),
            react_1.default.createElement("rect", { x: "71.936", y: "-26.9463", width: "1.5", height: "96", transform: "rotate(45 71.936 -26.9463)", fill: color }),
            react_1.default.createElement("rect", { x: "74.4106", y: "-24.4714", width: "1.5", height: "96", transform: "rotate(45 74.4106 -24.4714)", fill: color }),
            react_1.default.createElement("rect", { x: "76.8857", y: "-21.9965", width: "1.5", height: "96", transform: "rotate(45 76.8857 -21.9965)", fill: color }),
            react_1.default.createElement("rect", { x: "79.3604", y: "-19.5216", width: "1.5", height: "96", transform: "rotate(45 79.3604 -19.5216)", fill: color }),
            react_1.default.createElement("rect", { x: "81.8354", y: "-17.0468", width: "1.5", height: "96", transform: "rotate(45 81.8354 -17.0468)", fill: color }),
            react_1.default.createElement("rect", { x: "84.3105", y: "-14.5719", width: "1.5", height: "96", transform: "rotate(45 84.3105 -14.5719)", fill: color }),
            react_1.default.createElement("rect", { x: "86.7852", y: "-12.097", width: "1.5", height: "96", transform: "rotate(45 86.7852 -12.097)", fill: color }),
            react_1.default.createElement("rect", { x: "89.2603", y: "-9.62215", width: "1.5", height: "96", transform: "rotate(45 89.2603 -9.62215)", fill: color }),
            react_1.default.createElement("rect", { x: "91.7349", y: "-7.14726", width: "1.5", height: "96", transform: "rotate(45 91.7349 -7.14726)", fill: color }),
            react_1.default.createElement("rect", { x: "94.21", y: "-4.67239", width: "1.5", height: "96", transform: "rotate(45 94.21 -4.67239)", fill: color }),
            react_1.default.createElement("rect", { x: "96.6846", y: "-2.19753", width: "1.5", height: "96", transform: "rotate(45 96.6846 -2.19753)", fill: color }),
            react_1.default.createElement("rect", { x: "99.1597", y: "0.277344", width: "1.5", height: "96", transform: "rotate(45 99.1597 0.277344)", fill: color }),
            react_1.default.createElement("rect", { x: "101.634", y: "2.75223", width: "1.5", height: "96", transform: "rotate(45 101.634 2.75223)", fill: color }),
            react_1.default.createElement("rect", { x: "104.109", y: "5.2271", width: "1.5", height: "96", transform: "rotate(45 104.109 5.2271)", fill: color }),
            react_1.default.createElement("rect", { x: "106.584", y: "7.70197", width: "1.5", height: "96", transform: "rotate(45 106.584 7.70197)", fill: color }),
            react_1.default.createElement("rect", { x: "109.059", y: "10.1768", width: "1.5", height: "96", transform: "rotate(45 109.059 10.1768)", fill: color }),
            react_1.default.createElement("rect", { x: "111.534", y: "12.6517", width: "1.5", height: "96", transform: "rotate(45 111.534 12.6517)", fill: color }),
            react_1.default.createElement("rect", { x: "114.009", y: "15.1266", width: "1.5", height: "96", transform: "rotate(45 114.009 15.1266)", fill: color }),
            react_1.default.createElement("rect", { x: "116.484", y: "17.6015", width: "1.5", height: "96", transform: "rotate(45 116.484 17.6015)", fill: color })),
        react_1.default.createElement("defs", null,
            react_1.default.createElement("clipPath", { id: "clip0_10402_37468" },
                react_1.default.createElement("rect", { width: "148.5", height: "96", fill: "white", transform: "translate(22.4385 -76.4437) rotate(45)" })))));
};
exports.ShadedBgIcon = ShadedBgIcon;
