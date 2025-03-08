import { CreateChalengeDto } from "../../dto/create-chalenge.dto";
import { UpdateChalengeDto } from "../../dto/update-chalenge.dto";
import { Challenge } from "../../schemas/chalenge.schema";
import { chalengeService } from "../chalenges-service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ChalengeServiceImplimentation implements chalengeService {
    constructor(
        @InjectModel(Challenge.name) private readonly challengeModel: Model<Challenge>
    ) {}
    
    async getAllChalenges(): Promise<Challenge[]> {
        const currentDate = Date.now()

        return await this.challengeModel.find({ startDate: { $lte: currentDate },
            endDate: { $gte: currentDate } });
    }

    async getChalengeById(id:string): Promise<Challenge> {
        return await this.challengeModel.findById(id)
    }

    async joinChalenge(id:string,userId:string): Promise<Challenge>{
      
        const chalenge = await this.challengeModel.findById(id);
        if (!chalenge) {
            throw new UnauthorizedException('uou cant ')
        }

        const participant = chalenge.participants.find(participant => participant.userId === userId);
        if (participant) {
            throw new UnauthorizedException('You are allredy a participant of this challenge');
        }

        chalenge.participants.push({userId:userId,progress:0});

        return  chalenge.save();

    }

    async getChalengeByCreator(userId:string): Promise<Challenge[]>{
        const currentDate = Date.now()

        return this.challengeModel.find({ startDate: { $lte: currentDate },
            endDate: { $gte: currentDate },creator:userId })
    }

    async updateChalengesProgressByFrequency(frequency:string): Promise<Challenge[]>{
        const currentDate = Date.now()
       const challenges = await this.challengeModel.find({startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },frequency:frequency});
        return challenges
    }


    async createChalenge(chalenge: CreateChalengeDto): Promise<Challenge> {
        const createdChallenge = new this.challengeModel(chalenge);
        return createdChallenge.save();
    }

    async updateChalenge(id: string, chalenge: UpdateChalengeDto): Promise<Challenge> {
        const chalengeExist = await  this.challengeModel.findById(id);
        if(!chalengeExist || chalengeExist.creator != chalenge.creator ){
            throw new UnauthorizedException('the chalenge doesnt exist or you dont have the permition ')
        }
        if (chalenge.participants) {
            const existingParticipantIds = chalengeExist.participants.map((participant) => participant.userId);
                const newParticipants = (chalenge.participants as unknown as string[])
                .filter((newUserId) => !existingParticipantIds.includes(newUserId))
                .map((newUserId) => ({ userId: newUserId, progress: 0 })); 
    
            chalenge.participants = [
                ...chalengeExist.participants,
                ...newParticipants 
            ];
        }    
         
        return await this.challengeModel.findByIdAndUpdate(id, chalenge, { new: true }).exec();
    }
    async deleteChalenge(id: string, userId: string): Promise<Challenge> {
        const chalenge = await this.challengeModel.findById(id)
        if (chalenge.creator != userId) {
            throw new UnauthorizedException('this chalenge is not yours')
        }

        chalenge.deleteOne()
        return chalenge.save()
       
    }
}

