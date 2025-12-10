"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActiveOnScroll = void 0;
const react_1 = require("react");
const __1 = require("../..");
const navigation_1 = require("next/navigation");
const use_mutation_observer_1 = require("../use-mutation-observer");
const useActiveOnScroll = ({ rootElm, enable = true, useDefaultIfNoActive = true, maxLevel = 3, }) => {
    const [items, setItems] = (0, react_1.useState)([]);
    const [activeItemId, setActiveItemId] = (0, react_1.useState)("");
    const { scrollableElement } = (0, __1.useScrollController)();
    const { isBrowser } = (0, __1.useIsBrowser)();
    const pathname = (0, navigation_1.usePathname)();
    const root = (0, react_1.useMemo)(() => {
        if (!enable) {
            return;
        }
        if (rootElm) {
            return rootElm;
        }
        if (!isBrowser) {
            return;
        }
        return document;
    }, [rootElm, isBrowser, enable]);
    const querySelector = (0, react_1.useMemo)(() => {
        let selector = "";
        for (let i = 2; i <= maxLevel; i++) {
            if (i > 2) {
                selector += `,`;
            }
            selector += `h${i}`;
        }
        return selector;
    }, [maxLevel]);
    const getHeadingsInElm = (0, react_1.useCallback)(() => {
        if (!isBrowser || !enable) {
            return [];
        }
        const filteredHeadings = [];
        root?.querySelectorAll(querySelector).forEach((heading) => {
            if (heading.id) {
                filteredHeadings.push(heading);
            }
        });
        return filteredHeadings;
    }, [isBrowser, pathname, root, enable]);
    const setHeadingItems = (0, react_1.useCallback)(() => {
        if (!enable) {
            return;
        }
        const headings = getHeadingsInElm();
        const itemsToSet = [];
        let lastLevel2HeadingIndex = -1;
        headings?.forEach((heading) => {
            const level = parseInt(heading.tagName.replace("H", ""));
            const isLevel2 = level === 2;
            const headingItem = {
                heading: heading,
                children: [],
            };
            if (isLevel2 || lastLevel2HeadingIndex === -1) {
                itemsToSet.push(headingItem);
                if (isLevel2) {
                    lastLevel2HeadingIndex = itemsToSet.length - 1;
                }
            }
            else if (lastLevel2HeadingIndex !== -1) {
                itemsToSet[lastLevel2HeadingIndex].children?.push(headingItem);
            }
        });
        setItems(itemsToSet);
    }, [getHeadingsInElm, enable]);
    (0, use_mutation_observer_1.useMutationObserver)({
        elm: root,
        callback: setHeadingItems,
    });
    const setActiveToClosest = (0, react_1.useCallback)(() => {
        if (!enable) {
            return;
        }
        const rootBoundingRectElm = root && "getBoundingClientRect" in root
            ? root.getBoundingClientRect()
            : root?.body.getBoundingClientRect();
        if (rootBoundingRectElm === undefined ||
            (rootBoundingRectElm.top < 0 && rootBoundingRectElm.bottom < 0)) {
            setActiveItemId("");
            return;
        }
        const headings = getHeadingsInElm();
        let selectedHeadingByHash = undefined;
        const hash = location.hash.replace("#", "");
        let closestPositiveHeading = undefined;
        let closestNegativeHeading = undefined;
        let closestPositiveDistance = Infinity;
        let closestNegativeDistance = -Infinity;
        const halfway = (0, __1.isElmWindow)(scrollableElement)
            ? scrollableElement.innerHeight / 2
            : scrollableElement
                ? scrollableElement.scrollHeight / 2
                : 0;
        if (scrollableElement?.scrollTop === 0) {
            // set the first heading as active if the scrollable element is at the top
            setActiveItemId(items.length && useDefaultIfNoActive ? items[0].heading.id : "");
            return;
        }
        else if (scrollableElement?.scrollTop + scrollableElement?.clientHeight >=
            scrollableElement?.scrollHeight) {
            // set the last heading as active if the scrollable element is at the bottom
            let lastHeading = items[items.length - 1];
            while (lastHeading?.children?.length) {
                lastHeading = lastHeading.children[lastHeading.children.length - 1];
            }
            setActiveItemId(lastHeading && useDefaultIfNoActive ? lastHeading.heading.id : "");
            return;
        }
        headings?.forEach((heading) => {
            if (heading.id === hash) {
                selectedHeadingByHash = heading;
            }
            const headingDistance = heading.getBoundingClientRect().top;
            if (headingDistance > 0 && headingDistance < closestPositiveDistance) {
                closestPositiveDistance = headingDistance;
                closestPositiveHeading = heading;
            }
            else if (headingDistance < 0 &&
                headingDistance > closestNegativeDistance) {
                closestNegativeDistance = headingDistance;
                closestNegativeHeading = heading;
            }
        });
        const negativeDistanceToHalfway = closestNegativeDistance
            ? Math.abs(halfway + closestNegativeDistance)
            : 0;
        const positiveDistanceToHalfway = closestPositiveDistance
            ? Math.abs(halfway - closestPositiveDistance)
            : 0;
        const chosenClosest = !negativeDistanceToHalfway && !positiveDistanceToHalfway
            ? undefined
            : negativeDistanceToHalfway > positiveDistanceToHalfway
                ? closestNegativeHeading
                : closestPositiveHeading;
        setActiveItemId(chosenClosest
            ? chosenClosest.id
            : selectedHeadingByHash
                ? selectedHeadingByHash.id
                : items.length
                    ? useDefaultIfNoActive
                        ? items[0].heading.id
                        : ""
                    : "");
    }, [getHeadingsInElm, items, enable, root]);
    (0, react_1.useEffect)(() => {
        if (!scrollableElement || !enable) {
            return;
        }
        scrollableElement.addEventListener("scroll", setActiveToClosest);
        return () => {
            scrollableElement.removeEventListener("scroll", setActiveToClosest);
        };
    }, [scrollableElement, setActiveToClosest, enable]);
    (0, react_1.useEffect)(() => {
        if (items.length && enable) {
            setActiveToClosest();
        }
    }, [items, setActiveToClosest, enable]);
    return {
        items,
        activeItemId,
    };
};
exports.useActiveOnScroll = useActiveOnScroll;
