"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGenerateSnippet = void 0;
const subscriber_1 = require("./snippet-generators/subscriber");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generators = {
    subscriber: subscriber_1.subscriberSnippetGenerator,
};
const useGenerateSnippet = ({ type, options }) => {
    const snippet = generators[type](options);
    return {
        snippet,
    };
};
exports.useGenerateSnippet = useGenerateSnippet;
