function getTokenCookie() {
    const cookies = document.cookie
        .split(';')
        .map(cookie => cookie.trim().split('='))
        .reduce((cookies, [key, value]) => {
        cookies[key] = value;
        return cookies;
        }, {});
    
    return cookies.jwt;
};

export default getTokenCookie;