import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';


@Schema({ timestamps: true })
export class HabitProgress extends Document {
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true })
  habitId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, default: false })
  status: boolean;

  @Prop({ default: 0 })
  streak: number; 
}

export const HabitProgressSchema = SchemaFactory.createForClass(HabitProgress);
