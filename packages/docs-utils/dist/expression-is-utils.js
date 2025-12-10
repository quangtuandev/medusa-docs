export function isExpressionJsVarLiteral(expression) {
    return (typeof expression === "object" &&
        expression !== null &&
        Object.hasOwn(expression, "original"));
}
export function isExpressionJsVarObj(expression) {
    return (typeof expression === "object" &&
        expression !== null &&
        !Object.hasOwn(expression, "original"));
}
