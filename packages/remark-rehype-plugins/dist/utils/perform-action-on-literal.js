import { isExpressionJsVarLiteral, isExpressionJsVarObj } from "docs-utils";
export const performActionOnLiteral = (item, action) => {
    if (Array.isArray(item)) {
        item.forEach((i) => performActionOnLiteral(i, action));
    }
    else if (isExpressionJsVarLiteral(item)) {
        action(item);
    }
    else {
        Object.values(item).forEach((value) => {
            if (Array.isArray(value) || isExpressionJsVarObj(value)) {
                return performActionOnLiteral(value, action);
            }
            if (!isExpressionJsVarLiteral(value)) {
                return;
            }
            action(value);
        });
    }
};
