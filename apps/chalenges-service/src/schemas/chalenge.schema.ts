import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export enum Frequency {
    Daily = 'daily',
    Weekly = 'weekly',
    Monthly = 'monthly'
}

@Schema()
export class Challenge extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    image?: string;

    @Prop({ required: true })
    creator: string;

    @Prop({enum:['pending',"active","end"],default:"pending"})
    status:string;

    @Prop({required:true})
    repeats:number;

    @Prop({ type: [{ userId: String, progress: Number }], default: [] })
    participants: { userId: string, progress: number }[];
    
    @Prop({ type: String, enum: Frequency, required: true })
    frequency: Frequency;
    
    @Prop({ required:true})
    startDate: Date;

    @Prop({ required:true })
    endDate: Date;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);