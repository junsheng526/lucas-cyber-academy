import {firestoreService as db, Docs} from "./firestoreService";
import { Timestamp } from "firebase/firestore";

export const populateDummyData = async () => {
    try {
        // Insert users
        const users = [
            { name: "admin2", email: "admin2@admin.com", role: "admin", contact: "+0123456789" },
            { name: "teacher", email: "teacher@teacher.com", role: "teacher", contact: "+0187654321" },
            { name: "teacher2", email: "teacher2@teacher.com", role: "teacher", contact: "+0111222333" },
        ];

        const userIds = [];
        for (const user of users) {
            const userDocId = await db.insertDoc(Docs.USERS, {
                ...user,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });
            userIds.push(userDocId);
        }

        console.log("Users inserted:", userIds);

        // Insert courses
        const courses = [
            {
                name: "Math 101",
                description: "Basic Math Course",
                teacherId: userIds[1], // Assign the teacher
                fees: 500,
                schedule: [
                    { day: "Monday", startTime: "10:00 AM", endTime: "12:00 PM" },
                    { day: "Thursday", startTime: "2:00 PM", endTime: "4:00 PM" },
                ],
            },
            {
                name: "Science 101",
                description: "Basic Science Course",
                teacherId: userIds[1],
                fees: 600,
                schedule: [
                    { day: "Tuesday", startTime: "10:00 AM", endTime: "12:00 PM" },
                    { day: "Friday", startTime: "2:00 PM", endTime: "4:00 PM" },
                ],
            },
        ];

        const courseIds = [];
        for (const course of courses) {
            const courseDocId = await db.insertDoc("courses", {
                ...course,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });
            courseIds.push(courseDocId);
        }

        console.log("Courses inserted:", courseIds);

        // Insert enrollments
        const enrollments = [
            {
                studentId: userIds[0],
                courseId: courseIds[0],
                feesPaid: 200,
                outstandingFees: 300,
                attendance: [
                    { date: "2024-11-01", status: "present" },
                    { date: "2024-11-08", status: "absent" },
                ],
            },
            {
                studentId: userIds[0],
                courseId: courseIds[1],
                feesPaid: 0,
                outstandingFees: 600,
                attendance: [],
            },
        ];

        for (const enrollment of enrollments) {
            await db.insertDoc("enrollments", {
                ...enrollment,
                createdAt: Timestamp.now(),
            });
        }

        console.log("Enrollments inserted.");

        // Insert payments
        const payments = [
            {
                studentId: userIds[0],
                courseId: courseIds[0],
                amountPaid: 200,
                paymentDate: Timestamp.now(),
                method: "credit card",
            },
        ];

        for (const payment of payments) {
            await db.insertDoc("payments", {
                ...payment,
                createdAt: Timestamp.now(),
            });
        }

        console.log("Payments inserted.");

        // Insert schedules
        const schedules = [
            {
                courseId: courseIds[0],
                teacherId: userIds[1],
                lessons: [
                    { date: "2024-11-20", startTime: "10:00 AM", endTime: "12:00 PM", type: "regular" },
                    { date: "2024-11-22", startTime: "10:00 AM", endTime: "12:00 PM", type: "make-up" },
                ],
            },
        ];

        for (const schedule of schedules) {
            await db.insertDoc("schedules", {
                ...schedule,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });
        }

        console.log("Schedules inserted.");

        // Insert attendance
        const attendance = [
            {
                courseId: courseIds[0],
                lessonDate: "2024-11-20",
                attendees: [
                    { studentId: userIds[0], status: "present" },
                    { studentId: "studentId456", status: "absent" }, // Placeholder studentId
                ],
            },
        ];

        for (const record of attendance) {
            await db.insertDoc("attendance", {
                ...record,
                createdAt: Timestamp.now(),
            });
        }

        console.log("Attendance records inserted.");

    } catch (error) {
        console.error("Error populating dummy data:", error);
    }
};
