import { ApiTestingOptions } from "types";
export type useRequestRunnerProps = {
    pushLog: (...message: string[]) => void;
    onFinish: (message: string, statusCode: string) => void;
    replaceLog?: (message: string) => void;
};
export declare const useRequestRunner: ({ pushLog, onFinish, replaceLog, }: useRequestRunnerProps) => {
    runRequest: (apiRequestOptions: ApiTestingOptions) => void;
};
//# sourceMappingURL=index.d.ts.map