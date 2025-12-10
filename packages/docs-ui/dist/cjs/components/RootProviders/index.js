"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootProviders = void 0;
const react_1 = __importDefault(require("react"));
const providers_1 = require("../../providers");
const RootProviders = ({ children, layoutProviderProps = {}, }) => {
    return (react_1.default.createElement(providers_1.BrowserProvider, null,
        react_1.default.createElement(providers_1.MobileProvider, null,
            react_1.default.createElement(providers_1.LayoutProvider, { ...layoutProviderProps },
                react_1.default.createElement(providers_1.ColorModeProvider, null,
                    react_1.default.createElement(providers_1.ModalProvider, null, children))))));
};
exports.RootProviders = RootProviders;
