/// <reference types="react" />
export type ExampleType = {
    name: string;
    component: React.LazyExoticComponent<() => React.JSX.Element>;
    file: string;
};
export type ExampleRegistry = Record<string, ExampleType>;
//# sourceMappingURL=ui.d.ts.map