import { Prop ,Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({ timestamps: true })
export class Progress extends Document{

    @Prop({required:true})
    userId:string;

    @Prop({required:true})
    chalengeId:string;

    @Prop({enum:['active','expired'],default:'active'})
    status:string;

    @Prop({default:false})
    isDone:boolean;
    
    @Prop({ default: 0 })
    streak: number;
    
    
}

export const progressSchema = SchemaFactory.createForClass(Progress)