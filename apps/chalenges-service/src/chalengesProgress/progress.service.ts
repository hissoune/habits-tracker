import { Injectable } from "@nestjs/common";
import { chalengeProgressImpl } from "../buisness/impl/progress-service.impl";

@Injectable()
export class ProgressService {
    constructor(private readonly  progressImpl:chalengeProgressImpl) { }
   
 
    async getParticipantProgress(chalengeId:string,userId:string){
         return this.progressImpl.getProgressForChalenge(userId, chalengeId)
    }

    async createProgress (userId:string,chalengeId:string){
     return this.progressImpl.createProgress(userId, chalengeId)
    }

    async updateProgress(userId:string,chalengeId:string){
       return  await this.progressImpl.updateProgress(userId, chalengeId)
        
    }

    async completeProgress(id:string,userId:string){
       return this.progressImpl.completeProgress(id, userId)
    }
}