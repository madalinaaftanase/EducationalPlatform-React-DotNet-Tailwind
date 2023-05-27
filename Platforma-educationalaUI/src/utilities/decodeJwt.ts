import { getCookie } from "./cookieFunctions";

export function decodeJWT() {
    const token = getCookie("token");

    if (token) {
        const [header, payload, signature] = token.split('.');
        const payloadDecoded = JSON.parse(window.atob(payload));
        return payloadDecoded;
    } else {
        return null;
    }
}

export function getUserId() {
    const payload = decodeJWT();

    if (payload) {
        const nameIdentifier = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        return nameIdentifier;
    }

    return null;
}

export function getUserName() {
    const payload = decodeJWT();

    if (payload) {
        const givenname = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];
        const surname = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"];

        return `${surname} ${givenname}`;
    }

    return null;
}