type UseMutationObserverProps = {
    elm: Document | HTMLElement | undefined;
    callback: () => void;
    options?: {
        attributes?: boolean;
        characterData?: boolean;
        childList?: boolean;
        subtree?: boolean;
    };
};
export declare const useMutationObserver: ({ elm, callback, options, }: UseMutationObserverProps) => void;
export {};
//# sourceMappingURL=index.d.ts.map