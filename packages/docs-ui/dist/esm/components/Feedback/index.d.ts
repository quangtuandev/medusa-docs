import React from "react";
import { ExtraData } from "../../providers/Analytics";
export type FeedbackProps = {
    event: string;
    reportLink?: string;
    question?: string;
    positiveBtn?: string;
    negativeBtn?: string;
    positiveQuestion?: string;
    negativeQuestion?: string;
    submitBtn?: string;
    submitMessage?: string;
    showPossibleSolutions?: boolean;
    className?: string;
    extraData?: ExtraData;
    vertical?: boolean;
    showDottedSeparator?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const Feedback: ({ event, reportLink: initReportLink, question, positiveBtn, negativeBtn, positiveQuestion, negativeQuestion, submitBtn, submitMessage, showPossibleSolutions, className, extraData, vertical, showDottedSeparator, }: FeedbackProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map