import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum Frequency {
    Daily = 'daily',
    Weekly = 'weekly',
    Monthly = 'monthly'
}

export enum Status {
    Active = 'active',
    Completed = 'completed',
    Failed = 'failed'
}

@Schema({ timestamps: true })
export class Habit extends Document {

    @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'User' })
    userId: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop()
    description?: string;

    @Prop({ type: String, enum: Frequency, required: true })
    frequency: Frequency;

    @Prop()
    reminderTime?: Date;

    @Prop({ required: true, default: 0 })
    progress: number;

    @Prop({required:true})
    repeats:number;

    @Prop({ type: String, enum: Status, default: Status.Active, required: true })
    status: Status;
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
