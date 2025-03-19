import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PushToken extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  pushToken: string;
}

export const PushTokenSchema = SchemaFactory.createForClass(PushToken);
