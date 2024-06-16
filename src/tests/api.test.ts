//admin.test.ts
// const exp = require("../index");
const request = require("supertest");
const { app } = require('../app');
let token: any;
let mentorToken: any;
let studentToken: any;
let studentEmail: string;
let studentName: string;
let mentorEmail: string;
let mentorName: string;
let mentorId: string;
let studentId: string;
 
describe("admin tests", () => {
    beforeAll(async () => {
        const payload = { "email": "admin1@example.com", "password": "sdjhsdj" }
        let resp = await request(app).post("/login").send(payload).set('Content-Type', 'application/json').set('Accept', 'application/json');
        token = resp.body.token;
    })
    test("is app launched", async () => {
        const response = await request(app).get("/");
        expect(response.body.message).toEqual('Hello World');
    })
 
    test("add student", async () => {
        let timeNow = Math.ceil(Date.now()/10000);
        studentEmail = `student_${timeNow}@example.com`;
        studentName = `Student_${timeNow}`;
        const payload = {"name": `${studentName}`, "email": `${studentEmail}`,"password": "sdjhsdj","usertype": "student","active": true};
        const response = await request(app).post("/users").send(payload).set({ Authorization: `Bearer ${token}` }).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.body.id > 0).toBeTruthy();
        expect(response.body.token).toBeTruthy();
        expect(response.body.email).toEqual(studentEmail);
        expect(response.body.name).toEqual(studentName);
        expect(response.status).toEqual(201);
        studentId = response.body.id;
    })
 
    test("add mentor", async () => {
        let timeNow = Math.ceil(Date.now()/10000);
        mentorEmail = `mentor_${timeNow}@example.com`;
        mentorName = `Mentor_${timeNow}`;
        const payload = {"name": `${mentorName}`, "email": `${mentorEmail}`,"password": "sdjhsdj","usertype": "mentor","starttime": 10,"endtime": 18,"active": true};
        const response = await request(app).post("/users").send(payload).set({ Authorization: `Bearer ${token}` }).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.body.id > 0).toBeTruthy();
        expect(response.body.token).toBeTruthy();
        expect(response.body.email).toEqual(mentorEmail);
        expect(response.body.name).toEqual(mentorName);
        expect(response.status).toEqual(201);
        mentorId = response.body.id;
    })
 
    test("fetch mentor details", async () => {
        const response = await request(app).get(`/users/${mentorId}`).set({ Authorization: `Bearer ${token}` }).set('Accept', 'application/json');
        expect(response.body.users.email).toEqual(mentorEmail);
        expect(response.status).toEqual(200);
    })
 
    test("fetch student details", async () => {
        const response = await request(app).get(`/users/${studentId}`).set({ Authorization: `Bearer ${token}` }).set('Accept', 'application/json');
        expect(response.body.users.email).toEqual(studentEmail);
        expect(response.status).toEqual(200);
    })
    test("list all reviews", async () => {
        const response = await request(app).get("/reviews").set({ Authorization: `Bearer ${token}` }).set('Accept', 'application/json');
        // expect(response.body.users.email).toEqual('student_1718541189@example.com');
        expect(response.status).toEqual(200);
        //assert count
    })
    test("list all reviews for a mentor", async () => {
        const response = await request(app).get(`/reviews/getReviewsForUser/${mentorId}`).set({ Authorization: `Bearer ${token}` }).set('Accept', 'application/json');
        // expect(response.body.users.email).toEqual('student_1718541189@example.com');
        expect(response.status).toEqual(200);
        //assert count
    })
    test("list all reviews for a student", async () => {
        const response = await request(app).get(`/reviews/getReviewsForUser/${studentId}`).set({ Authorization: `Bearer ${token}` }).set('Accept', 'application/json');
        // expect(response.body.users.email).toEqual('student_1718541189@example.com');
        expect(response.status).toEqual(200);
        //assert count
    })
})