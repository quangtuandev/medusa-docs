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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarItemCategory = void 0;
// @refresh reset
const react_1 = __importStar(require("react"));
const __1 = require("../../../..");
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const SidebarItemCategory = ({ item, className, }) => {
    const [showLoading, setShowLoading] = (0, react_1.useState)(false);
    const [open, setOpen] = (0, react_1.useState)(item.initialOpen !== undefined ? item.initialOpen : false);
    const { isItemActive, updatePersistedCategoryState, getPersistedCategoryState, persistCategoryState, } = (0, __1.useSidebar)();
    const itemShowLoading = (0, react_1.useMemo)(() => {
        return !item.loaded || (item.showLoadingIfEmpty && !item.children?.length);
    }, [item]);
    const isActive = (0, react_1.useMemo)(() => {
        return isItemActive({
            item,
        });
    }, [isItemActive, item]);
    (0, react_1.useEffect)(() => {
        if (open && itemShowLoading) {
            setShowLoading(true);
        }
    }, [open, itemShowLoading]);
    (0, react_1.useEffect)(() => {
        if (!itemShowLoading && showLoading) {
            setShowLoading(false);
        }
    }, [itemShowLoading, showLoading]);
    (0, react_1.useEffect)(() => {
        if (isActive && !open) {
            setOpen(true);
        }
    }, [isActive, item.children]);
    (0, react_1.useEffect)(() => {
        if (!persistCategoryState) {
            return;
        }
        const persistedOpen = getPersistedCategoryState(item.title);
        if (persistedOpen !== undefined && !isActive) {
            setOpen(persistedOpen);
        }
    }, [persistCategoryState]);
    const handleOpen = () => {
        if (!open) {
            item.onOpen?.();
        }
        if (persistCategoryState) {
            updatePersistedCategoryState(item.title, !open);
        }
        setOpen((prev) => !prev);
    };
    const isTitleOneWord = (0, react_1.useMemo)(() => item.title.split(" ").length === 1, [item.title]);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("my-docs_0.75 first:!mt-0 w-full relative", className) },
        react_1.default.createElement("div", { className: "px-docs_0.75" },
            react_1.default.createElement("div", { className: (0, clsx_1.default)("py-docs_0.25 px-docs_0.5", "flex justify-between items-center gap-docs_0.5", "text-medusa-fg-muted", "cursor-pointer relative", "z-[2]", !isTitleOneWord && "break-words"), tabIndex: -1, onClick: handleOpen },
                react_1.default.createElement("span", { className: (0, clsx_1.default)("text-compact-x-small-plus", isTitleOneWord && "truncate") }, item.title),
                item.additionalElms,
                item.badge && (react_1.default.createElement(__1.Badge, { variant: item.badge.variant }, item.badge.text)),
                !item.additionalElms && (react_1.default.createElement(react_1.default.Fragment, null,
                    open && react_1.default.createElement(icons_1.TriangleDownMini, null),
                    !open && react_1.default.createElement(icons_1.TriangleUpMini, null))))),
        !item.hideChildren && (react_1.default.createElement("ul", { className: (0, clsx_1.default)("ease-ease", "flex flex-col gap-docs_0.125", "z-[1] relative", !open && "overflow-hidden m-0 h-0") },
            item.children?.map((childItem, index) => (react_1.default.createElement(__1.SidebarItem, { item: childItem, key: index, isParentCategoryOpen: open }))),
            showLoading && (react_1.default.createElement(__1.Loading, { count: 3, className: "!mb-0 !px-docs_0.5", barClassName: "h-[20px]" }))))));
};
exports.SidebarItemCategory = SidebarItemCategory;
