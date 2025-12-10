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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentMenuVersion = void 0;
const react_1 = __importStar(require("react"));
const Card_1 = require("../../Card");
const providers_1 = require("../../../providers");
const clsx_1 = __importDefault(require("clsx"));
const LOCAL_STORAGE_KEY = "last-version";
const ContentMenuVersion = () => {
    const { config: { version }, } = (0, providers_1.useSiteConfig)();
    const [showNewVersion, setShowNewVersion] = (0, react_1.useState)(false);
    const { isBrowser } = (0, providers_1.useIsBrowser)();
    const cardRef = react_1.default.useRef(null);
    (0, react_1.useEffect)(() => {
        if (!isBrowser) {
            return;
        }
        const storedVersion = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedVersion !== version.number) {
            setShowNewVersion(true);
        }
    }, [isBrowser]);
    const handleClose = () => {
        if (!showNewVersion) {
            return;
        }
        setShowNewVersion(false);
        localStorage.setItem(LOCAL_STORAGE_KEY, version.number);
    };
    (0, react_1.useEffect)(() => {
        if (!showNewVersion || version.hide || !cardRef.current) {
            return;
        }
        cardRef.current.classList.add("animate", "animate-fadeInDown");
    }, [showNewVersion, version.hide, cardRef]);
    return (react_1.default.createElement(Card_1.Card, { type: "mini", title: `New version`, text: `v${version.number} details`, closeable: true, onClose: handleClose, href: version.releaseUrl, hrefProps: {
            target: "_blank",
            rel: "noopener noreferrer",
        }, themeImage: version.bannerImage, imageDimensions: {
            width: 64,
            height: 40,
        }, className: (0, clsx_1.default)("!border-0 !bg-medusa-bg-component hover:!bg-medusa-bg-component-hover", "hover:!bg-medusa-bg-component-hover animation-fill-forwards", "opacity-0"), iconClassName: (0, clsx_1.default)("!shadow-none border-[0.5px] border-medusa-alphas-alpha-250"), cardRef: cardRef }));
};
exports.ContentMenuVersion = ContentMenuVersion;
