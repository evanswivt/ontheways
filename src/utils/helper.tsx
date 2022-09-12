
export function isServer() {
  return typeof window === "undefined";
}

export function isLoggedIn() {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return true;
  }
  return false;
}

export const consoleLog = (data: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(data);
  }
};

export const consoleError = (data: any) => {
  if (process.env.NODE_ENV === "development") {
    console.error(data);
  }
};

export const isJSON = (str: any) => {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
};

// export function avatarUrl(url: string) {
//   if (url) {
//     if (url.includes("https://") || url.includes("http://")) return url;
//     return `${UPLOAD_URL}${url}`;
//   }
//   return `/avatar.png`;
// }
//
// export function getCookie(name: any) {
//   if (process.browser) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(";");
//     for (var i = 0; i < ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) == " ") c = c.substring(1, c.length);
//       if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//     }
//     return null;
//   }
// }
//
// export function getApiMediaUrl(url: string) {
//   return `${config.api.url}/api/v1/media?url=${encodeURIComponent(url)}`;
// }
