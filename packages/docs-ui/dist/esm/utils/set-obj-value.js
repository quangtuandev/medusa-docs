export default function setObjValue({ obj, value, path, }) {
    // split path by delimiter
    const splitPath = path.split(".");
    const targetKey = splitPath[0];
    if (!Object.hasOwn(obj, targetKey)) {
        obj[targetKey] = {};
    }
    if (splitPath.length === 1) {
        obj[targetKey] = value;
        return obj;
    }
    if (typeof obj[targetKey] !== "object") {
        throw new Error(`value of ${targetKey} is not an object, so can't set nested value`);
    }
    setObjValue({
        obj: obj[targetKey],
        value,
        path: splitPath.slice(1).join("."),
    });
    return obj;
}
