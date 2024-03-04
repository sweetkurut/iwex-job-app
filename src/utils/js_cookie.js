import Cookies from 'js-cookie';

export const saveCookie = (name, value) => {
    Cookies.set(name, value);
}

export const getCookie = (name) => {
    return Cookies.get(name);
}

export const deleteCookies = (names) => {
    names.forEach(name => {
        Cookies.remove(name);
    });
};