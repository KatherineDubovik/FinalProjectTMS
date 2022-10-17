import { Booking, Credentials } from "./types";

export const bookingToCreate: Booking = {
    firstname: "Monica",
    lastname: "Geller",
    totalprice: 310,
    depositpaid: true,
    bookingdates: {
        checkin: "2022-11-03",
        checkout: "2022-12-24"
    },
    additionalneeds: "Breakfast"
}

export const { firstname, lastname } = bookingToCreate;

export const bookingToUpdate: Booking = {
    firstname: "Rachel",
    lastname: "Green",
    totalprice: 654,
    depositpaid: true,
    bookingdates: {
        checkin: "2022-10-01",
        checkout: "2022-10-25"
    },
    additionalneeds: "Breakfast"
}

export const validCredentials: Credentials = {
    username: "admin",
    password: "password123"
}

export const invalidCredentials: Credentials = {
    username: "user",
    password: "qwerty123"
}
