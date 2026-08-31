export function saveCookie(obj: object, name: string) {
    const val = encodeURIComponent(JSON.stringify(obj));
    document.cookie = `${name}=${val}; path=/; max-age=604800; samesite=strict; Secure;`;
}

export function getCookie(name: string) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return JSON.parse(decodeURIComponent(match[2]));
    }
    return null;
}

export function checkIfCookieExists(name: string): boolean {
    return document.cookie.split(';').some(c => c.trim().startsWith(name + '='));
}