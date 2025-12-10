import { readFileSync } from "fs";
const REGEX = /export const metadata = {[\s\S]*title: `(?<title>.*)`/;
export function findMetadataTitle(content) {
    const headingMatch = REGEX.exec(content);
    return headingMatch?.groups?.title;
}
export function findPageHeading(content) {
    const headingMatch = /# (?<title>.*)/.exec(content);
    return headingMatch?.groups?.title;
}
export function findAllPageHeadings({ content, level = 1, }) {
    const regex = new RegExp(`^${"#".repeat(level)}(?!#) (?<title>.*?)(?:\n|$)`, "gm");
    const matches = [...content.matchAll(regex)];
    return matches.map((match) => match.groups?.title).filter(Boolean);
}
export function findPageTitle(filePath) {
    const content = readFileSync(filePath, "utf-8");
    return findMetadataTitle(content) || findPageHeading(content);
}
