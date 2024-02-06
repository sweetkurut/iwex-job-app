import Cookies from 'js-cookie';

export const saveCookie = (name, value) => {
    Cookies.set(name, value);
}

export const getCookie = (name) => {
    return Cookies.get(name);
}

export const deleteCookie = (name) => {
    Cookies.remove(name);
}
