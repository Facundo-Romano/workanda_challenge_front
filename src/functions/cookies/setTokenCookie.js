function setTokenCookie(value) {
    const date = new Date();
    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = "jwt=" + value + ";" + expires + ";path=/";
};

export default setTokenCookie;