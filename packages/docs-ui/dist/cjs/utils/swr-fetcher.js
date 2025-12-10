"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swrFetcher = void 0;
const swrFetcher = async (input, init) => {
    const res = await fetch(input, init);
    return res.json();
};
exports.swrFetcher = swrFetcher;
