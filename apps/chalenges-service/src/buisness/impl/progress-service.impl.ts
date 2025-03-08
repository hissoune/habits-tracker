import { InjectModel } from "@nestjs/mongoose";
import { Progress } from "../../schemas/progress.schema";
import { progressService } from "../progress-service";
import { Model } from "mongoose";
import { UnauthorizedException } from "@nestjs/common";
import { Challenge } from '../../schemas/chalenge.schema';

export class chalengeProgressImpl implements progressService {


    constructor( @InjectModel(Progress.name) private readonly ProgressModel: Model<Progress>,@InjectModel(Challenge.name) private readonly chalengeModel: Model<Challenge>) {}

    async createProgress(userId: string, chalengeId: string): Promise<Progress> {
      const newProgress = new this.ProgressModel({
        chalengeId:chalengeId,
        userId:userId
      });
      return newProgress.save();
    }

    async getProgressForChalenge (userId: string, chalengeId: string): Promise<Progress>{
        const progress = await  this.ProgressModel.findOne({userId:userId,chalengeId:chalengeId,status:'active'});
        return progress;

    } 

    async completeProgress(id: string, userId: string): Promise<Progress> {

      const progress = await this.ProgressModel.findById(id);
      if (progress.userId != userId) {
        throw new UnauthorizedException('you cant do rthat bro ');
      }
        progress.isDone = true

        return progress.save()

    }

    async updateProgress(userId: string, chalengeId: string): Promise<{ progress: Progress, chalenge: Challenge }> {
        const progress = await  this.ProgressModel.findOne({userId:userId,chalengeId:chalengeId,status:'active'});
        const chalenge = await this.chalengeModel.findById(chalengeId);
        if (progress.isDone   ) {
          if (progress.streak < chalenge.repeats) {
            progress.streak += 1;
            progress.isDone = false
            const participantProgress = Math.round(((progress.streak / chalenge.repeats) * 100 || 0))|| 0;
            const participantIndex = chalenge.participants.findIndex(p => p.userId === userId);
            if (participantIndex !== -1) {
                chalenge.participants[participantIndex].progress = participantProgress;
            }
          }
          

         }else {
          progress.streak = 0;
         }
        await progress.save();
        await chalenge.save();

        return {progress,chalenge}
    }
}
   

    
