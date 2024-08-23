import { match } from "assert";
import mongoose,{Schema,Document, Model} from "mongoose";


export interface Message extends Document { 
    content: String;
    createdAt: Date;    
}

const MessageSchema: Schema = new Schema({
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

export interface User extends Document {
    content:String;
    email:String;   
    password:String;
    verifyCode:String;
    verifCodeExpiry:Date;
    isAcceptingMessage:boolean;
    messages: Message[];

}
const UserSchema: Schema = new Schema({
    username:{unique:true},

    email:{type:String,
        required:[true,"Email is required"],
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']},

    password:{type:String, required:[true,"Password is required"], minlength:8},
    verifyCode: {type: String, default: ""},
    verifCodeExpiry: {type: Date, default: Date.now},
    isAcceptingMessage: {type: Boolean, default: true},
    messages: [MessageSchema]
        
     
})
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model('User',UserSchema);
export default UserModel;