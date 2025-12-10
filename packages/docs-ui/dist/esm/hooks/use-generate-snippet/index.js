import { subscriberSnippetGenerator, } from "./snippet-generators/subscriber";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generators = {
    subscriber: subscriberSnippetGenerator,
};
export const useGenerateSnippet = ({ type, options }) => {
    const snippet = generators[type](options);
    return {
        snippet,
    };
};
