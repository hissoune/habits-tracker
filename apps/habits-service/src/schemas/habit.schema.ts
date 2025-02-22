import { Schema, model, Document } from 'mongoose';

enum Frequency {
    Daily = 'daily',
    Weekly = 'weekly',
    Monthly = 'monthly'
}

enum Status {
    Active = 'active',
    Completed = 'completed',
    Failed = 'failed'
}

export interface Habit extends Document {
    userId: Schema.Types.ObjectId;
    progress: number;
    title: string;
    description?: string;
    frequency: Frequency;
    reminderTime?: Date;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}

export const HabitSchema = new Schema<Habit>({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String },
    frequency: { type: String, enum: Object.values(Frequency), required: true },
    reminderTime: { type: Date },
    progress: { type: Number, required: true, default: 0 },
    status: { type: String, enum: Object.values(Status), required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const HabitModel = model<Habit>('Habit', HabitSchema);