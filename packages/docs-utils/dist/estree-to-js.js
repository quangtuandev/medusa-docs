export function estreeToJs(estree) {
    // TODO improve on this utility. Currently it's implemented to work
    // for specific use cases as we don't have a lot of info on other
    // use cases.
    if (!estree.body?.length ||
        estree.body[0].type !== "ExpressionStatement" ||
        !estree.body[0].expression) {
        return;
    }
    return expressionToJs(estree.body[0].expression);
}
function expressionToJs(expression) {
    switch (expression.type) {
        case "ArrayExpression":
            const arrVar = [];
            expression.elements.forEach((elm) => {
                const elmJsVar = expressionToJs(elm);
                if (!elmJsVar) {
                    return;
                }
                if (Array.isArray(elmJsVar)) {
                    arrVar.push(...elmJsVar);
                }
                else {
                    arrVar.push(elmJsVar);
                }
            });
            return arrVar;
        case "ObjectExpression":
            const objVar = {};
            expression.properties.forEach((property) => {
                const keyName = property.key.name ?? property.key.value;
                if (!keyName) {
                    return;
                }
                const jsVal = expressionToJs(property.value);
                if (!jsVal) {
                    return;
                }
                objVar[keyName] = jsVal;
            });
            return objVar;
        case "Literal":
            return {
                original: expression,
                data: expression.value,
            };
        case "JSXElement":
        case "JSXFragment":
            // Only take text children
            let text = "";
            expression.children.forEach((child) => {
                if (child.type !== "JSXText") {
                    return;
                }
                text += child.value;
            });
            return {
                original: {
                    type: "Literal",
                    value: text,
                    raw: `"${text}"`,
                },
                data: text,
            };
    }
}
