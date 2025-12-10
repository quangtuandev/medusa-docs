"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRunner = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const hooks_1 = require("../../hooks");
const CodeBlock_1 = require("../CodeBlock");
const __1 = require("../..");
const ParamInputs_1 = require("./ParamInputs");
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const ArrowRightDown_1 = require("../Icons/ArrowRightDown");
const FooterBackground_1 = require("./FooterBackground");
exports.ApiRunner = react_1.default.forwardRef(function ApiRunner({ apiMethod, apiUrl, pathData, bodyData, queryData }, ref) {
    // assemble api testing options
    const [apiTestingOptions, setApiTestingOptions] = (0, react_2.useState)({
        method: apiMethod,
        url: apiUrl,
        pathData,
        bodyData,
        queryData,
    });
    const [isRunning, setIsRunning] = (0, react_2.useState)(false);
    const [ran, setRan] = (0, react_2.useState)(false);
    const hasData = (data) => data !== undefined && Object.keys(data).length > 0;
    // TODO change to be based on whether auth/data needed
    const manualTestTrigger = (0, react_2.useMemo)(() => hasData(apiTestingOptions.pathData) ||
        hasData(apiTestingOptions.queryData) ||
        hasData(apiTestingOptions.bodyData), [apiTestingOptions]);
    const [responseLogs, setResponseLogs] = (0, react_2.useState)([]);
    const [responseCode, setResponseCode] = (0, react_2.useState)();
    const pushMessage = (...message) => setResponseLogs((prev) => [...prev, ...message]);
    const { runRequest } = (0, hooks_1.useRequestRunner)({
        pushLog: pushMessage,
        onFinish: (_message, statusCode) => {
            setIsRunning(false);
            setResponseCode(statusCode);
        },
        replaceLog: (message) => setResponseLogs([message]),
    });
    (0, react_2.useEffect)(() => {
        if (!isRunning && !manualTestTrigger && !ran) {
            setIsRunning(true);
        }
    }, [apiTestingOptions, manualTestTrigger, isRunning, ran]);
    (0, react_2.useEffect)(() => {
        if (isRunning && !ran) {
            setRan(true);
            setResponseLogs(["Sending request..."]);
            runRequest(apiTestingOptions);
        }
    }, [isRunning, ran]);
    return (react_1.default.createElement("div", { className: "mb-docs_1", ref: ref },
        manualTestTrigger && (react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-bg-component rounded-docs_DEFAULT", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "mb-docs_0.75") },
            react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center gap-docs_0.75", "px-docs_0.75 pb-docs_0.75 pt-docs_0.5") },
                react_1.default.createElement(icons_1.ArrowDownRightMini, { className: "text-medusa-fg-muted" }),
                react_1.default.createElement("div", { className: "flex-1 flex items-center gap-docs_0.75" },
                    apiTestingOptions.pathData && (react_1.default.createElement(ParamInputs_1.ApiRunnerParamInputs, { data: apiTestingOptions.pathData, title: "Path Parameters", baseObjPath: "pathData", setValue: setApiTestingOptions })),
                    apiTestingOptions.bodyData && (react_1.default.createElement(ParamInputs_1.ApiRunnerParamInputs, { data: apiTestingOptions.bodyData, title: "Request Body Parameters", baseObjPath: "bodyData", setValue: setApiTestingOptions })),
                    apiTestingOptions.queryData && (react_1.default.createElement(ParamInputs_1.ApiRunnerParamInputs, { data: apiTestingOptions.queryData, title: "Request Query Parameters", baseObjPath: "queryData", setValue: setApiTestingOptions }))),
                react_1.default.createElement(ArrowRightDown_1.ArrowRightDownIcon, { className: "text-medusa-fg-muted" })),
            react_1.default.createElement("div", { className: (0, clsx_1.default)("border-t border-medusa-border-base", "py-docs_0.5 px-docs_0.75 relative", "flex justify-end items-center gap-docs_0.5") },
                react_1.default.createElement(FooterBackground_1.ApiRunnerFooterBackground, null),
                react_1.default.createElement(__1.Button, { onClick: () => {
                        setIsRunning(true);
                        setRan(false);
                    }, className: "relative", variant: "secondary" }, "Send Request")))),
        (isRunning || ran) && (react_1.default.createElement(CodeBlock_1.CodeBlock, { source: responseLogs.join("\n"), lang: "json", title: "Testing Result", collapsed: true, noReport: true, badgeLabel: responseCode || "Failed", badgeColor: !responseCode
                ? "red"
                : responseCode.startsWith("2")
                    ? "green"
                    : "red" }))));
});
