export type ActiveOnScrollItem = {
    heading: HTMLHeadingElement;
    children?: ActiveOnScrollItem[];
};
export type UseActiveOnScrollProps = {
    rootElm?: Document | HTMLElement;
    enable?: boolean;
    useDefaultIfNoActive?: boolean;
    maxLevel?: number;
};
export declare const useActiveOnScroll: ({ rootElm, enable, useDefaultIfNoActive, maxLevel, }: UseActiveOnScrollProps) => {
    items: ActiveOnScrollItem[];
    activeItemId: string;
};
//# sourceMappingURL=index.d.ts.map