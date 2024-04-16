import { ObjectId } from "mongodb";

 
 export interface NotiomDoc {
  _id: ObjectId;
  user: string;
  title: string;
  body: string;
}