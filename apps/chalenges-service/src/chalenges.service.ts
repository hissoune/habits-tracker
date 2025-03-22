import { Inject, Injectable } from '@nestjs/common';
import { ChalengeServiceImplimentation } from './buisness/impl/chalenge-service.impl';
import { Challenge } from './schemas/chalenge.schema';
import { CreateChalengeDto } from './dto/create-chalenge.dto';
import { UpdateChalengeDto } from './dto/update-chalenge.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ProgressService } from './chalengesProgress/progress.service';
import { chalengesGateway } from './gateway/chalenges.gateway';


@Injectable()
export class ChalengesService {
  constructor(private readonly chalengeServiceImplimentation:ChalengeServiceImplimentation,private readonly progressService:ProgressService,@Inject("AUTH_SERVICE") private readonly authClient:ClientProxy,private readonly chalengeGateway:chalengesGateway,@Inject('NOTIFICATIONS_SERVICE') private readonly notificationsClient:ClientProxy){}

  async getCreatrorAndParticipants(challenge:any){
    const chalenge = challenge.toObject ? challenge.toObject() : challenge;
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
    }
    chalenge.creator = creator

    return chalenge;

  }


  async  getAllChalenges(){

    const chalenges =await  this.chalengeServiceImplimentation.getAllChalenges();

    for (let i = 0; i < chalenges.length; i++) {
     
      chalenges[i] = await this.getCreatrorAndParticipants(chalenges[i] )
  }
    return chalenges;
  }


 async getUserChalenges(userId:string){

    const chalenges =await this.chalengeServiceImplimentation.getChalengeByCreator(userId);

    for (let i = 0; i < chalenges.length; i++) {
      chalenges[i] = await this.getCreatrorAndParticipants(chalenges[i] ); 
  }

  return chalenges;
  }
  getChalengeById(id:string){
    return this.chalengeServiceImplimentation.getChalengeById(id)
  }
 async joinChalenge(id:string,userId:string):Promise<Challenge>{
    
  const chalenge =await this.chalengeServiceImplimentation.joinChalenge(id, userId)
  const chelengeWithdetails =  await this.getCreatrorAndParticipants(chalenge)
  
  return chelengeWithdetails

   
  }
 async createChalenge(challenge:CreateChalengeDto):Promise<Challenge> {
    const chalenge =await this.chalengeServiceImplimentation.createChalenge(challenge);
   
    return await this.getCreatrorAndParticipants(chalenge)
  }

 async updateChalenge(id:string,challenge:UpdateChalengeDto):Promise<Challenge>{
    const chalenge =await this.chalengeServiceImplimentation.updateChalenge(id, challenge)
    return await this.getCreatrorAndParticipants(chalenge)
  }
  deleteChalenge(id:string){
    return this.chalengeServiceImplimentation.deleteChalenge(id)
  }
 async updateChalengesProgressByFrequency(frequency:string){
   const challenges:Challenge[] =  await this.chalengeServiceImplimentation.updateChalengesProgressByFrequency(frequency)
   for (const challenge of challenges) {
   
    if (challenge.participants && challenge.participants.length >0) {
      
      for(const  participant of challenge.participants){
        if (participant.progress < 100) {
          const progress = await  this.progressService.getParticipantProgress(challenge._id as string, participant.userId as string);

          if (!progress) {
            await this.progressService.createProgress( participant.userId as string,challenge._id as string)
            console.log(`Progress created for challenge: ${challenge.title} (${frequency})`);
  
          }else {
          const data =   await this.progressService.updateProgress( participant.userId as string,challenge._id as string);
          const chalenge = await this.getCreatrorAndParticipants(data)
          this.notificationsClient.emit('chalenge_updated', {
            userId:participant.userId,
            chalengId:chalenge._id,
            progress: participant.progress,
            title: 'Challenge  Progress Updated',
            message: `Your chalenge ${chalenge.title} is now at ${participant.progress}% progress!`
          });
         await this.chalengeGateway.emitchalengeUpdate(chalenge)
           console.log(`Progress update for challenge: ${challenge.title} (${frequency})`);
  
          }
        }
    
      }
    }

   }

  }
}
