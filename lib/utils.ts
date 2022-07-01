/**
 * Text stripped of any html/markdown contents
 */

export function strip(html: string) {
    // from https://stackoverflow.com/questions/822452/strip-html-from-text-javascript/47140708#47140708
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
}