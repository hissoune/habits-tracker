import { Injectable } from '@nestjs/common';
import { ChalengeServiceImplimentation } from './buisness/impl/chalenge-service.impl';
import { Challenge } from './schemas/chalenge.schema';
import { CreateChalengeDto } from './dto/create-chalenge.dto';
import { UpdateChalengeDto } from './dto/update-chalenge.dto';

@Injectable()
export class ChalengesService {
  constructor(private readonly chalengeServiceImplimentation:ChalengeServiceImplimentation){}

  getAllChalenges(){
    return  this.chalengeServiceImplimentation.getAllChalenges();
  }
  getUserChalenges(userId:string){
  return this.chalengeServiceImplimentation.getChalengeByCreator(userId)
  }
  getChalengeById(id:string){
    return this.chalengeServiceImplimentation.getChalengeById(id)
  }
  createChalenge(chalenge:CreateChalengeDto):Promise<Challenge> {
    return this.chalengeServiceImplimentation.createChalenge(chalenge);
  }

  updateChalenge(id:string,chalenge:UpdateChalengeDto):Promise<Challenge>{
   return this.chalengeServiceImplimentation.updateChalenge(id, chalenge)
  }
  deleteChalenge(id:string,userId:string){
    return this.chalengeServiceImplimentation.deleteChalenge(id, userId)
  }
 async updateChalengesProgressByFrequency(frequency:string):Promise<Challenge[]>{
    return await this.chalengeServiceImplimentation.updateChalengesProgressByFrequency(frequency)
  }
}
