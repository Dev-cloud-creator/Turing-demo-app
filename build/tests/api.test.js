"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//admin.test.ts
// const exp = require("../index");
const request = require("supertest");
const { app } = require('../app');
let token;
let mentorToken;
let studentToken;
let studentEmail;
let studentName;
let mentorEmail;
let mentorName;
let mentorId;
let studentId;
describe("admin tests", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const payload = { "email": "admin1@example.com", "password": "sdjhsdj" };
        let resp = yield request(app).post("/login").send(payload).set('Content-Type', 'application/json').set('Accept', 'application/json');
        token = resp.body.token;
    }));
    test("is app launched", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get("/");
        expect(response.body.message).toEqual('Hello World');
    }));
    test("add student", () => __awaiter(void 0, void 0, void 0, function* () {
        let timeNow = Math.ceil(Date.now() / 10000);
        studentEmail = `student_${timeNow}@example.com`;
        studentName = `Student_${timeNow}`;
        const payload = { "name": `${studentName}`, "email": `${studentEmail}`, "password": "sdjhsdj", "usertype": "student", "active": true };
        const response = yield request(app).post("/users").send(payload).set({ Authorization: `Bearer ${token}` }).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.body.id > 0).toBeTruthy();
        expect(response.body.token).toBeTruthy();
        expect(response.body.email).toEqual(studentEmail);
        expect(response.body.name).toEqual(studentName);
        expect(response.status).toEqual(201);
        studentId = response.body.id;
    }));
    test("add mentor", () => __awaiter(void 0, void 0, void 0, function* () {
        let timeNow = Math.ceil(Date.now() / 10000);
        mentorEmail = `mentor_${timeNow}@example.com`;
        mentorName = `Mentor_${timeNow}`;
        const payload = { "name": `${mentorName}`, "email": `${mentorEmail}`, "password": "sdjhsdj", "usertype": "mentor", "starttime": 10, "endtime": 18, "active": true };
        const response = yield request(app).post("/users").send(payload).set({ Authorization: `Bearer ${token}` }).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.body.id > 0).toBeTruthy();
        expect(response.body.token).toBeTruthy();
        expect(response.body.email).toEqual(mentorEmail);
        expect(response.body.name).toEqual(mentorName);
        expect(response.status).toEqual(201);
        mentorId = response.body.id;
    }));
    test("fetch mentor details", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get(`/users/${mentorId}`).set({ Authorization: `Bearer ${token}` }).set('Accept', 'application/json');
        expect(response.body.users.email).toEqual(mentorEmail);
        expect(response.status).toEqual(200);
    }));
    test("fetch student details", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get(`/users/${studentId}`).set({ Authorization: `Bearer ${token}` }).set('Accept', 'application/json');
        expect(response.body.users.email).toEqual(studentEmail);
        expect(response.status).toEqual(200);
    }));
    test("list all reviews", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get("/reviews").set({ Authorization: `Bearer ${token}` }).set('Accept', 'application/json');
        // expect(response.body.users.email).toEqual('student_1718541189@example.com');
        expect(response.status).toEqual(200);
        //assert count
    }));
    test("list all reviews for a mentor", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get(`/reviews/getReviewsForUser/${mentorId}`).set({ Authorization: `Bearer ${token}` }).set('Accept', 'application/json');
        // expect(response.body.users.email).toEqual('student_1718541189@example.com');
        expect(response.status).toEqual(200);
        //assert count
    }));
    test("list all reviews for a student", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get(`/reviews/getReviewsForUser/${studentId}`).set({ Authorization: `Bearer ${token}` }).set('Accept', 'application/json');
        // expect(response.body.users.email).toEqual('student_1718541189@example.com');
        expect(response.status).toEqual(200);
        //assert count
    }));
});
//# sourceMappingURL=api.test.js.map