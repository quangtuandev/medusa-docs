"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePostHogAnalytics = void 0;
const posthog_js_1 = __importDefault(require("posthog-js"));
const usePostHogAnalytics = () => {
    const track = async ({ event, options }) => {
        posthog_js_1.default.capture(event, options);
    };
    return {
        track,
    };
};
exports.usePostHogAnalytics = usePostHogAnalytics;
