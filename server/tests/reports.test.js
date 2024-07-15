// reportRoutes.test.js

import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import reportRoutes from '../routes/reportRoutes.js';
import { Donation } from '../models/Donationmodel.js';

const app = express();
app.use('/generate-report', reportRoutes);

describe('GET /generate-report', () => {
    let mongoServer;

    beforeAll(async () => {
        // Start the in-memory MongoDB server
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        // Connect to the in-memory MongoDB server
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        // Disconnect and stop the in-memory MongoDB server
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        // Clear the database before each test
        await Donation.deleteMany({});
    });

    it('should generate a PDF report with the donations', async () => {
        // Seed the database with some donations
        const donations = [
            { name: 'Canned Beans', donor: 'Andy', quantity: 10, date: new Date(), category: 'Food' },
            { name: 'Rice', donor: 'Andy', quantity: 20, date: new Date(), category: 'Food' },
        ];
        await Donation.insertMany(donations);

        const res = await request(app).get('/generate-report');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('application/pdf');
        expect(res.headers['content-disposition']).toContain('attachment;filename=report.pdf');

        // Additional checks can be performed on the PDF content if necessary
        // For example, you can use a library to parse and validate the PDF content
    });
});
