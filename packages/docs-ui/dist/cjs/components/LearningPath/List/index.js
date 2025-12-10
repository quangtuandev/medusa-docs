"use strict";
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
exports.LearningPathList = void 0;
const react_1 = __importStar(require("react"));
const learning_paths_1 = require("../../../utils/learning-paths");
const __1 = require("..");
const LearningPathList = ({ ignore = [] }) => {
    const paths = (0, react_1.useMemo)(() => {
        const paths = (0, learning_paths_1.getLearningPaths)();
        ignore.forEach((pathName) => {
            const pathIndex = paths.findIndex((path) => path.name === pathName);
            if (pathIndex !== -1) {
                paths.splice(pathIndex, 1);
            }
        });
        return paths;
    }, [ignore]);
    return (react_1.default.createElement("div", { className: "flex flex-col flex-wrap gap-docs_2 mt-docs_1.5" }, paths.map((path, index) => (react_1.default.createElement(__1.LearningPath, { pathName: path.name, key: index, className: "!mt-0 !mb-0" })))));
};
exports.LearningPathList = LearningPathList;
