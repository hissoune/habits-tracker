import { Schema } from 'mongoose';
import { Frequency, Habit, Status } from '../../../../types';
export class CreateHabitDto implements Habit {
    userId?: Schema.Types.ObjectId;
    startDate: Date;
    endDate?: Date;
    progress?: number;
    title: string;
    description?: string;
    frequency: Frequency;
    reminderTime?: Date;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}