export const encodeBase64 = (str) => {
    return btoa(unescape(encodeURIComponent(str)));
};
  
export const decodeBase64 = (encodedStr) => {
    return decodeURIComponent(escape(atob(encodedStr)));
};