import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

    @Prop({ type: [{ userId: String, progress: Number }], default: [] })
    participants: { userId: string, progress: number }[];

    @Prop({ required:true})
    startDate: Date;

    @Prop({ required:true })
    endDate: Date;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);