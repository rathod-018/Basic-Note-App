import mongoose from "mongoose"


export const connectDb = async function () {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MONGODB CONNECTED SUCCESSFULLY !!!")
    } catch (error) {
        console.error("ERORR : MONGODB CONECTION FAILED !!!", error);
        process.exit(1)// exit with failuer
    }
}