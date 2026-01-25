import mongoose  from 'mongoose';


const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.mongoodburl);
        console.log("Mongodb is Connected");
    } catch(error){
        console.log( `Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;