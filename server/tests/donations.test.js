import supertest from 'supertest'
import router from '../routes/Donationroutes'


describe("POST /donations", () =>{
    
    describe("given a valid donation", () => {
        // Should save the Donation to the the database
        test("Should save the Donation", async () =>{
            
        })
        // should the respond with a json object conationting the donation id
        test("Should respond with donation id", async () => {
            const respone = await request(router).post("https://localhost:5050/donations").send({
                name: "Cheerios",
                donor: "Jeff",
                date: "11/12/2015",
                quantity: 5,
                category: "Food",
                comments: "NA",
            })
            expect(response.body).toHaveProperty('_id')
        })
        // should respond with a 200 status code
        test("Should respond with a 200 status code", async () =>{
            const respone = await request(router).post("https://localhost:5050/donations".send({
                name: "Cheerios",
                donor: "Jeff",
                date: "11/12/2015",
                quantity: 5,
                category: "Food",
                comments: "NA",
            }))
            expect(response.statusCode).toBe(200)
        })

    })

    describe("given a invalide donation" , () =>{
        // Should respond with a status code of 400
        test("Should respond with status code 400", async () =>{
            const respone = await request(router).post("https://localhost:5050/donations".send({
                name: "",
                donor: "Jeff",
                date: "",
                quantity: 5,
                category: "Food",
                comments: "NA",
            }))
            expect(responnse.statusCode).toBe(400)
        })
    })
})