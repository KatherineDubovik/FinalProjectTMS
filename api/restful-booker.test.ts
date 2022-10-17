/* eslint-disable @typescript-eslint/no-explicit-any */
import superagent from "superagent";
import { expect } from "chai";
import { bookingToCreate, bookingToUpdate, firstname, invalidCredentials, lastname, validCredentials } from "./support/testData";
import { ERRORS } from "./support/types";
import { baseUrl, bookingUrl } from "./support/constants";

let response: any;
let token: string;
let bookingId: number;

describe("Test HTTP-methods for Restful-booker", () => {
    describe("Test POST-methods", () => {
        it("Should correctly create authorization token for valid credentials", async () => {
            try {
                response = await superagent
                .post(`${baseUrl}/auth`)
                .set("Accept", "application/json")
                .send(validCredentials);
            } catch (err: any) {
                throw new Error (err.message);
            }
            expect(response.statusCode).to.equal(200);
            token = response.body.token;
        });

        it("Should correctly handle creating of authorization token for invalid credentials", async () => {
            try {
                response = await superagent
                .post(`${baseUrl}/auth`)
                .set("Accept", "application/json")
                .send(invalidCredentials);
            } catch (err: any) {
                throw new Error (err.message);
            }
            expect(response.statusCode).to.equal(200);
            expect(response.body.reason).to.equal(ERRORS.BAD_CREDS);
        });

        it("Should correctly create new booking", async () => {
            try {
                response = await superagent
                .post(bookingUrl)
                .set("Accept", "application/json")
                .send(bookingToCreate);
            } catch (err: any) {
                throw new Error (err.message);
            }
            expect(response.statusCode).to.equal(200);
            expect(response.body.booking).to.eql(bookingToCreate);
            bookingId = response.body.bookingid;
        });
    });

    describe("Test GET-methods", () => {
        it("Should correctly get all booking Ids", async () => {
            try {
                response = await superagent
                .get(bookingUrl);
            } catch (err: any) {
                throw new Error (err.message);
            }
            expect(response.statusCode).to.equal(200);
        });

        it("Should correctly get booking Ids filtered by checkin & checkout date", async () => {
            try {
                response = await superagent
                .get(bookingUrl)
                .set("checkin", bookingToCreate.bookingdates.checkin)
                .set("checkout", bookingToCreate.bookingdates.checkout)
            } catch (err: any) {
                throw new Error (err.message);
            }
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.deep.include({ bookingid: bookingId });
        });

        it("Should correctly get booking by id", async () => {
            try {
                response = await superagent
                .get(`${bookingUrl}/${bookingId}`)
                .set("Accept", "application/json");
            } catch (err: any) {
                throw new Error (err.message);
            } 

            expect(response.statusCode).to.equal(200);
            expect(response.body).to.eql(bookingToCreate);
        });
    });

    describe("Test PUT-methods", () => {
        it("Should correctly update booking by authorized user", async () => {
            try {
                response = await superagent
                .put(`${bookingUrl}/${bookingId}`)
                .set("Accept", "application/json")
                .set("Cookie", `token=${token}`)
                .send(bookingToUpdate);
            } catch (err: any) {
                throw new Error (err.message);
            } 

            expect(response.statusCode).to.equal(200);
            expect(response.body).to.eql(bookingToUpdate);
        });

        it("Should correctly handle trying to update booking by unauthorized user", async () => {
            try {
                response = await superagent
                .put(`${bookingUrl}/${bookingId}`)
                .set("Accept", "application/json")
                .send(bookingToUpdate);
            } catch (err: any) {
                expect(err.status).to.equal(403);
                expect(err.message).to.equal(ERRORS.FORBIDDEN);
            } 
        });

        it("Should correctly handle trying to update booking with missing required fields", async () => {
            try {
                response = await superagent
                .put(`${bookingUrl}/${bookingId}`)
                .set("Accept", "application/json")
                .set("Cookie", `token=${token}`)
                .send({ firstname, lastname });
            } catch (err: any) {
                expect(err.status).to.equal(400);
                expect(err.message).to.equal(ERRORS.BAD_REQUEST);
            } 
        });
    });

    describe("Test PATCH-methods", () => {
        it("Should correctly update booking by authorized user", async () => {
            try {
                response = await superagent
                .patch(`${bookingUrl}/${bookingId}`)
                .set("Accept", "application/json")
                .set("Cookie", `token=${token}`)
                .send({ firstname, lastname });
            } catch (err: any) {
                throw new Error (err.message);
            } 

            expect(response.statusCode).to.equal(200);
            expect(response.body.firstname).to.equal(firstname);
            expect(response.body.lastname).to.equal(lastname);
        });

        it("Should correctly handle trying to update booking by unauthorized user", async () => {
            try {
                response = await superagent
                .patch(`${bookingUrl}/${bookingId}`)
                .set("Accept", "application/json")
                .send({ firstname, lastname });
            } catch (err: any) {
                expect(err.status).to.equal(403);
                expect(err.message).to.equal(ERRORS.FORBIDDEN);
            } 
        });
    });

    describe("Test DELETE-methods", () => {
        it("Should correctly delete booking by authorized user", async () => {
            try {
                response = await superagent
                .delete(`${bookingUrl}/${bookingId}`)
                .set("Accept", "application/json")
                .set("Cookie", `token=${token}`);
            } catch (err: any) {
                throw new Error (err.message);
            } 

            expect(response.statusCode).to.equal(201);
        })

        it("Should correctly handle trying to delete booking by unauthorized user", async () => {
            try {
                response = await superagent
                .delete(`${bookingUrl}/${bookingId}`)
                .set("Accept", "application/json");
            } catch (err: any) {
                expect(err.status).to.equal(403);
                expect(err.message).to.equal(ERRORS.FORBIDDEN);
            } 
        })

        it("Should correctly handle trying to delete non-existing booking", async () => {
            try {
                response = await superagent
                .patch(`${bookingUrl}/${bookingId}`)
                .set("Accept", "application/json")
                .set("Cookie", `token=${token}`);
            } catch (err: any) {
                expect(err.status).to.equal(405);
                expect(err.message).to.equal(ERRORS.METHOD_NOT_ALLOWED);
            } 
        });
    });
});
