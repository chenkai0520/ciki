function setCookie(name, data, age = 24 * 60 * 60 * 1000) {
    document.cookie = `${name}=${data}; path=/; max-age=${age}; domain=${window.location.hostname}`;
}

export {
    setCookie
}