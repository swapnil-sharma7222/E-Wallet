import { connect as _connect } from "mongoose";

const connectdb = async () => {
    try {
     const connect= await _connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}`).then(()=> {
        console.log("Patched to database....");
     });
    }
    catch (e) {
        console.log(e);
    }
};
export default connectdb;
