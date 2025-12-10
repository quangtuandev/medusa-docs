export const createNodeClusters = (steps) => {
    const clusters = {};
    steps.forEach((step) => {
        if (!clusters[step.depth]) {
            clusters[step.depth] = [];
        }
        if (step.type === "when") {
            const whenSteps = step.steps.map((whenStep) => ({
                ...whenStep,
                depth: step.depth,
                when: step,
            }));
            clusters[step.depth].push(...whenSteps);
        }
        else {
            clusters[step.depth].push(step);
        }
    });
    return clusters;
};
export const getNextCluster = (clusters, depth) => {
    const nextDepth = depth + 1;
    return clusters[nextDepth];
};
