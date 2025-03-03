import { Prop ,Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({ timestamps: true })
export class Progress extends Document{

    @Prop({required:true})
    userId:string;

    @Prop({required:true})
    chalengeId:string;

    @Prop({enum:['active','completed','expired']})
    status:string;

    @Prop({ default: 0 })
    streak: number;
    
    
}

export const progressSchema = SchemaFactory.createForClass(Progress)