"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = slugify;
exports.generateSlug = generateSlug;
function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}
function generateSlug(text, suffix) {
    const base = slugify(text);
    return suffix ? `${base}-${suffix}` : base;
}
//# sourceMappingURL=slugify.js.map