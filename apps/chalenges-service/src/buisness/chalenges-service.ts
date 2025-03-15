import { CreateChalengeDto } from "../dto/create-chalenge.dto";
import { UpdateChalengeDto } from "../dto/update-chalenge.dto";
import { Challenge } from "../schemas/chalenge.schema";


export interface chalengeService {
    getAllChalenges():Promise<Challenge[]>;
    getChalengeById(id:string):Promise<Challenge>;
    joinChalenge(id:string,userId):Promise<Challenge>;
    getChalengeByCreator(userId:string):Promise<Challenge[]>;
    updateChalengesProgressByFrequency(freauency:string): Promise<Challenge[]>;
    createChalenge(chalenge:CreateChalengeDto):Promise<Challenge>;
    updateChalenge(id:string,chalenge:UpdateChalengeDto):Promise<Challenge>;
    deleteChalenge(id:string):Promise<Challenge>;
    
}