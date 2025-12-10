import { UnistNodeWithData } from "types";
export default function getAttribute(node: UnistNodeWithData, attrName: string): {
    name: string;
    value: string | {
        data?: {
            estree?: import("types").Estree | undefined;
        } | undefined;
        value?: string | undefined;
    };
    type?: string | undefined;
} | undefined;
//# sourceMappingURL=get-attribute.d.ts.map