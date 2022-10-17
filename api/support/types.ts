export interface Booking {
    firstname: string,
    lastname: string,
    totalprice: number,
    depositpaid: boolean,
    bookingdates: {
        checkin: string,
        checkout: string
    },
    additionalneeds: string
}

export interface Credentials {
    username: string,
    password: string
}

export enum ERRORS {
    BAD_CREDS = "Bad credentials",
    BAD_REQUEST = "Bad Request",
    FORBIDDEN = "Forbidden",
    METHOD_NOT_ALLOWED = "Method Not Allowed"
}
