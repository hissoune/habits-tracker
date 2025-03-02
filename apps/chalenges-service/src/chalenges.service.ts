import { Injectable } from '@nestjs/common';
import { ChalengeServiceImplimentation } from './buisness/impl/chalenge-service.impl';
import { Challenge } from './schemas/chalenge.schema';
import { CreateChalengeDto } from './dto/create-chalenge.dto';
import { UpdateChalengeDto } from './dto/update-chalenge.dto';

@Injectable()
export class ChalengesService {
  constructor(private readonly chalengeServiceImplimentation:ChalengeServiceImplimentation){}


  createChalenge(chalenge:CreateChalengeDto):Promise<Challenge> {
    return this.chalengeServiceImplimentation.createChalenge(chalenge);
  }

  updateChalenge(id:string,chalenge:UpdateChalengeDto):Promise<Challenge>{
   return this.chalengeServiceImplimentation.updateChalenge(id, chalenge)
  }
}
