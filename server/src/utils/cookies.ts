import { Request } from "express";

export const setCookie = (req: Request, name: string, value: string) => {
  req.headers.cookie = name + "=" + (value || "")  + "; path=/";
}

export const getCookie = (req: Request, name: string) => {
  if (!req.headers.cookie) {
    return null;
  }

  var nameEQ = name + "=";
  var ca = req.headers.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

export const eraseCookie = (req: Request, name: string) => {
  req.headers.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}