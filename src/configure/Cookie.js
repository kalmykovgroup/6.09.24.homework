

 const AUTH_STORAGE_KEY  = "Authenticated";

export const getUser = () => {
    const value = get(AUTH_STORAGE_KEY);
    if(value === "") return undefined;
    return JSON.parse(value);
};
export const setUser = (value) => set(AUTH_STORAGE_KEY, value,1);
export const deleteUser = () => deleteCookie(AUTH_STORAGE_KEY);



 function set(name, value, options = {}) {

     options = {
         path: '/',
         // при необходимости добавьте другие значения по умолчанию
         ...options
     };

     if (options.expires instanceof Date) {
         options.expires = options.expires.toUTCString();
     }

     let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

     for (let optionKey in options) {
         updatedCookie += "; " + optionKey;
         let optionValue = options[optionKey];
         if (optionValue !== true) {
             updatedCookie += "=" + optionValue;
         }
     }

     document.cookie = updatedCookie;
 }

 // Пример использования:
 function deleteCookie(name) {
     set(name, "", {
         'max-age': -1
     })
 }

export const get = (cookieName) => {
    if (document.cookie.length > 0) {
        let cookieStart = document.cookie.indexOf(cookieName + '=');
        if (cookieStart !== -1) {
            cookieStart = cookieStart + cookieName.length + 1;
            let cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = document.cookie.length;
            }
            return window.unescape(document.cookie.substring(cookieStart, cookieEnd));
        }
    }
    return '';
};