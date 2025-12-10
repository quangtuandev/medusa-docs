"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReoDevAnalytics = void 0;
const react_1 = require("react");
// @ts-expect-error Doesn't have a types package
const reodotdev_1 = require("reodotdev");
const useReoDevAnalytics = ({ reoDevKey }) => {
    (0, react_1.useEffect)(() => {
        if (!reoDevKey) {
            return;
        }
        (0, reodotdev_1.loadReoScript)({
            clientID: reoDevKey,
        })
            .then((Reo) => {
            ;
            Reo.init({
                clientID: reoDevKey,
            });
        })
            .catch((e) => {
            console.error(`Could not connect to Reodotdev. Error: ${e}`);
        });
    }, [reoDevKey]);
};
exports.useReoDevAnalytics = useReoDevAnalytics;
