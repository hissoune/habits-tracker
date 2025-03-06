import { Inject, Injectable } from '@nestjs/common';
import { ChalengeServiceImplimentation } from './buisness/impl/chalenge-service.impl';
import { Challenge } from './schemas/chalenge.schema';
import { CreateChalengeDto } from './dto/create-chalenge.dto';
import { UpdateChalengeDto } from './dto/update-chalenge.dto';
import { ClientProxy } from '@nestjs/microservices';
import { from } from 'rxjs';
import { log } from 'console';

@Injectable()
export class ChalengesService {
  constructor(private readonly chalengeServiceImplimentation:ChalengeServiceImplimentation,@Inject("AUTH_SERVICE") private readonly authClient:ClientProxy){}

  async  getAllChalenges(){

    const chalenges =await  this.chalengeServiceImplimentation.getAllChalenges();

    for (let i = 0; i < chalenges.length; i++) {
      let chalenge = chalenges[i].toObject(); 
      const creator = await this.authClient.send('get-creator', chalenge.creator).toPromise();
   
      if (chalenge.participants && chalenge.participants.length > 0) {
          const userIds = chalenge.participants.map(p => p.userId);
          const users = await this.authClient.send('get-users', userIds).toPromise();
          const updatedParticipants = chalenge.participants.map(participant => {
              const user = users.find(u => u._id.toString() === participant.userId.toString());
  
  
              return {
                  ...participant,
                  userDetails: user || null, 
              };
          });

          chalenge.participants = updatedParticipants;
         
          
          console.log(chalenge.participants);
          
      }
      chalenge.creator = creator

      chalenges[i] = chalenge;
  }
    

    return chalenges;
  }
  getUserChalenges(userId:string){
  return this.chalengeServiceImplimentation.getChalengeByCreator(userId)
  }
  getChalengeById(id:string){
    return this.chalengeServiceImplimentation.getChalengeById(id)
  }
  joinChalenge(id:string,userId:string):Promise<Challenge>{
    console.log({id,userId});
    
  return  this.chalengeServiceImplimentation.joinChalenge(id, userId)
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
