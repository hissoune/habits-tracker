import mongoose, { Date, Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    birthDay: Date;

    @Prop({ required: true })
    image: string;

   @Prop({enum:['admin','client'] ,default:'client'})
   role:string
    
}


export type UserDocument = User & Document;

export const UserModelSchema = SchemaFactory.createForClass(User);
