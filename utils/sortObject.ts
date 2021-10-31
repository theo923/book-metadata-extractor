export const ordered = (unordered) =>
    Object.keys(unordered)
        .sort()
        .reduce((obj, key) => {
            obj[key] = unordered[key];
            return obj;
        }, {});
