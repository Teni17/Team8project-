import mongoose from 'mongoose'
import request from 'supertest'
import app from '../server'
import { Donation } from '../models/Donationmodel'

import dotenv from 'dotenv'

let deleteDonations = []

beforeAll(async () => {
    const dbUri = process.env.TEST
    if (!dbUri){
        throw new Error('dbUri undefined')
    }
    await mongoose.createConnection(dbUri)
})

afterEach(async () => {
    await Donation.deleteMany({ _id: {$in: deleteDonations }})
    deleteDonations = []
})

afterAll(async () =>{
    
    await mongoose.connection.close()
    
})

describe("POST /donations", () =>{
    
    describe("given a valid donation", () => {
        // Should save the Donation to the the database
        test("Should save the Donation", async () =>{
            const donationData = {
                name: "Cheerios",
                donor: "Jeff",
                date: "11/12/2015",
                quantity: 5,
                category: "Food",
                comments: "NA",
            }
            const response = await request(app).post("/donations").send(donationData)

            expect(response.statusCode).toBe(200)
            expect(response.body.name).toBe(donationData.name)
            expect(response.body.donor).toBe(donationData.donor)
            //expect(response.body.date).toBe(donationData.date)
            expect(response.body.quantity).toBe(donationData.quantity)
            expect(response.body.category).toBe(donationData.category)
            expect(response.body.comments).toBe(donationData.comments)

            const saved = await Donation.findById(response.body._id)
            expect(saved).not.toBeNull()
            expect(saved.name).toBe(donationData.name)
            expect(saved.donor).toBe(donationData.donor)
            //expect(saved.date).toBe(donationData.date)
            expect(saved.quantity).toBe(donationData.quantity)
            expect(saved.category).toBe(donationData.category)
            expect(saved.comments).toBe(donationData.comments)

            deleteDonations.push(saved._id)

        })
    
        // should respond with a 200 status code
        test("Should respond with a 200 status code", async () =>{
            const donationData = {
                name: "Cheerios",
                donor: "Jeff",
                date: "11/12/2016",
                quantity: 5,
                category: "Food",
                comments: "NA",
            }
            const response = await request(app).post("/donations").send(donationData)
            const saved = await Donation.findById(response.body._id)
            expect(response.statusCode).toBe(200)
            deleteDonations.push(saved._id)
        })

    })

    describe("given a invalide donation" , () =>{
        // Should respond with a status code of 400
        test("Should respond with status code 400", async () =>{
            const donationData = {
                name: "",
                donor: "Jeff",
                date: "",
                quantity: 5,
                category: "Food",
                comments: "NA",
            }
            const response = await request(app).post("/donations").send(donationData)
            expect(response.statusCode).toBe(400)

        })
    })


    //To View Inventory Test
    describe("GET /donations", () =>{
        //Should give back status code of 200
        describe("Given a get request", () =>{
            
            test("Should give back 200", async () =>{
    
               
                const saved = await request(app).get(`/donations`);
                expect(saved.statusCode).toBe(200)
                
                
    
            })
        })
    })
})
