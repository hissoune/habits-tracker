import { CreateChalengeDto } from "../dto/create-chalenge.dto";
import { UpdateChalengeDto } from "../dto/update-chalenge.dto";
import { Challenge } from "../schemas/chalenge.schema";


export interface chalengeService {
 
    createChalenge(chalenge:CreateChalengeDto):Promise<Challenge>;
    updateChalenge(id:string,chalenge:UpdateChalengeDto):Promise<Challenge>;
    
    
}