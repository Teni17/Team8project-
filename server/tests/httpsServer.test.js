import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';
import https from 'https';
import path from 'path';
import reportRoutes from '../routes/reportRoutes.js';
import { Donation } from '../models/Donationmodel.js';

const app = express();
app.use('/generate-report', reportRoutes);

describe('HTTPS Server and TLS Encryption', () => {
    let mongoServer, server;

    beforeAll(async () => {
        // Start the in-memory MongoDB server
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        // Connect to the in-memory MongoDB server
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Setup HTTPS server
        const privateKey = fs.readFileSync(path.join('key.pm'), 'utf8');
        const certificate = fs.readFileSync(path.join('cert.pm'), 'utf8');
        const credentials = { key: privateKey, cert: certificate };

        server = https.createServer(credentials, app).listen(5050);
    });

    afterAll(async () => {
        // Disconnect and stop the in-memory MongoDB server
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();

        // Close the HTTPS server
        server.close();
    });

    beforeEach(async () => {
        // Clear the database before each test
        await Donation.deleteMany({});
    });

    it('should generate a PDF report with the donations over HTTPS', async () => {
        // Seed the database with some donations
        const donations = [
            { name: 'Canned Beans', donor: 'Andy', quantity: 10, date: new Date(), category: 'Food' },
            { name: 'Rice', donor: 'Andy', quantity: 20, date: new Date(), category: 'Food' },
        ];
        await Donation.insertMany(donations);

        // Make HTTPS request
        const agent = new https.Agent({
            rejectUnauthorized: false, // For testing purposes, do not reject self-signed certificates
        });

        const res = await request(server)
            .get('/generate-report')
            .agent(agent)
            .set('Accept', 'application/pdf');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('application/pdf');
        expect(res.headers['content-disposition']).toContain('attachment;filename=report.pdf');
    });
});
