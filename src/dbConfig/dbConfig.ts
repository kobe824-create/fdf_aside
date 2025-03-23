import mongoose from "mongoose"


export default async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('MongoDb successfully connected');
        })
        connection.on('error', () => {
            console.log('mongoDb failed to connect');
            process.exit();
        })
    } catch (error: unknown) {
        console.log("somethings went wrong!", error);
    }
}