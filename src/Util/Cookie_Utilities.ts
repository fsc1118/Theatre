/**
 *
 *
 * @Shicheng Fang
 *
 *
 * Cookie utilities
 *
 * */

let getCookie = (key: string):string|null => {
    let a = `; ${document.cookie}`.match(`;\\s*${key}=([^;]+)`);
    return a ? a[1] : null;
}

let setCookie = (cName: string, cValue: string, expDays:number = 365):void => {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

let getUsernameFromCookie = ():null|string => {
    return getCookie("username")
}
export {getCookie, setCookie, getUsernameFromCookie}