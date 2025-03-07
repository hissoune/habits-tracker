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
}