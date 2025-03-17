import { Date, Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type:Date, required: true })
    birthDay: Date;

    @Prop({required:true,default:false})
    isBaned:boolean

    @Prop({ required: true })
    image: string;

   @Prop({enum:['admin','client'] ,default:'client'})
   role:string
    
}



export const UserModelSchema = SchemaFactory.createForClass(User);
