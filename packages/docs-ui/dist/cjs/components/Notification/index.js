"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationContainer = void 0;
const providers_1 = require("../../providers");
const react_1 = __importDefault(require("react"));
const Item_1 = require("./Item");
// @ts-expect-error can't install the types package because it doesn't support React v19
const react_transition_group_1 = require("react-transition-group");
const clsx_1 = __importDefault(require("clsx"));
const NotificationContainer = () => {
    const { notifications, removeNotification } = (0, providers_1.useNotifications)();
    const handleClose = (notification) => {
        notification.onClose?.();
        if (notification.id) {
            removeNotification(notification.id);
        }
    };
    const renderFilteredNotifications = (condition, className) => {
        return (react_1.default.createElement(react_transition_group_1.TransitionGroup, { className: (0, clsx_1.default)("flex fixed z-40 flex-col gap-docs_0.5 right-0", "md:w-auto w-full overflow-y-auto", "max-h-[50%] md:max-h-[calc(100vh-57px)]", "max-[768px]:max-h-[50%]", className) }, notifications.filter(condition).map((notification) => (react_1.default.createElement(Item_1.NotificationItem, { ...notification, onClose: () => handleClose(notification), className: (0, clsx_1.default)(notification.className, "!relative !top-0 !bottom-0 !right-0"), key: notification.id })))));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        renderFilteredNotifications((notification) => notification.placement === "top", "top-0"),
        renderFilteredNotifications((notification) => notification.placement !== "top", "bottom-0")));
};
exports.NotificationContainer = NotificationContainer;
