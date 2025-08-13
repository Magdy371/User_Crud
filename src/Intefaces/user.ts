//Type Script interface
//User Interface

import { Document } from 'mongoose';

export interface IUser extends  Document{
    uuid:string;
    name:string;
    email:string;
    age:number;

    //Bothe auto created when using mongoose:
    //  timestamp option in userModel-> represent Schemea
    createdAt:Date;
    updatedAt:Date;
}