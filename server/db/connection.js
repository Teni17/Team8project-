import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.ATLAS_URI || "";


if(!uri){
    throw new Error("Missing Atlas_uri env")
}
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const connectDb = async () => {
    try {
        await client.connect();
    
        await client.db("admin").command({ ping: 1});
        console.log(
            "Pinged your deployment. You successfully connect to Mongodb!"
        );
    } catch(err){
        console.error("Eror connecting to MongoDb", err);
    }
}

connectDb()

//Going to do let db = client.db("Somehting for the databas most likley users or something like that")

let db = client.db("Project 0")


export default db;


