import { Injectable } from "@nestjs/common";
import { chalengeProgressImpl } from "../buisness/impl/progress-service.impl";
import { chalengesGateway } from "../gateway/chalenges.gateway";

@Injectable()
export class ProgressService {
    constructor(private readonly  progressImpl:chalengeProgressImpl,private readonly chalengeGateway:chalengesGateway) { }
   
 
    async getParticipantProgress(chalengeId:string,userId:string){
         return this.progressImpl.getProgressForChalenge(userId, chalengeId)
    }

    async createProgress (userId:string,chalengeId:string){
     return this.progressImpl.createProgress(userId, chalengeId)
    }

    async updateProgress(userId:string,chalengeId:string){
        const data = await this.progressImpl.updateProgress(userId, chalengeId)
          this.chalengeGateway.emitchalengeUpdate(data)
    }
}