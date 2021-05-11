export const parseObject = (obj: {[key: string]: any}) => {
    const str = [];

    for (const p in obj)
        if (p && obj[p]) {
            str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
        }

    return `${str.length > 0 ? '?' : ''}${str.join('&')}`;
};