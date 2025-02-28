import { CreateChalengeDto } from "../dto/create-chalenge.dto";
import { Challenge } from "../schemas/chalenge.schema";


export interface chalengeService {
 
    createChalenge(chalenge:CreateChalengeDto):Promise<Challenge>
    
}