import { Schema } from "mongoose";
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



export type Habit=  {
    userId?: Schema.Types.ObjectId;
    progress?: number;
    title: string;
    description?: string;
    frequency: Frequency;
    reminderTime?: Date;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}