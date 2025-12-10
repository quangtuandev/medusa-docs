import { useEffect } from "react";
// @ts-expect-error Doesn't have a types package
import { loadReoScript } from "reodotdev";
export const useReoDevAnalytics = ({ reoDevKey }) => {
    useEffect(() => {
        if (!reoDevKey) {
            return;
        }
        loadReoScript({
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
