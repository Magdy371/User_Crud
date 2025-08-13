//Mongoose Model
//User Scheme

import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../Intefaces/user';

//Creates a new Mongoose schema that follows the IUser interface.
const userScheme = new Schema<IUser>(
    {
        uuid:{
            type:String,
            required:true,
            unique:true,
            index:true,
            default:()=>uuidv4()
        },
        name:{
            type:String,
            required:[true, 'Please add your name'],
            trim:true,
            maxlength:[50,'Max Length 50 character']
        },
        email:{
            type:String,
            required:[true,'Add your mail'],
            trim:true,
            lowercase:true,
            //Uses regex validation to ensure the email format is valid.
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
        },
        age:{
            type:Number,
            required:true,
            min: [18, 'Age must be at least 18']
        }
    },
    {
        /*
        timestamps: Adds createdAt and updatedAt automatically
        as mentioned in user.ts-> interface
        */
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            // the document id will not appear in json reurn 
            delete ret._id;
            //delete mongoose version key
            delete (ret as any).__v;
            }
        }
    }
);
//Creates the User model linked to the users collection in MongoDB.
const User = model<IUser>('User', userScheme);
export default User;