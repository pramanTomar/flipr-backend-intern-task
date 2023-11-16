import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config('./.env');

const mongooseUri = process.env.MONGOOSE_URL;

export default () => {
    try {
        mongoose.connect(mongooseUri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        ).then(console.log("MongoDB Connected"));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};