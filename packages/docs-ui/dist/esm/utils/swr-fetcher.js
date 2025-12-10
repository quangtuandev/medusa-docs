export const swrFetcher = async (input, init) => {
    const res = await fetch(input, init);
    return res.json();
};
