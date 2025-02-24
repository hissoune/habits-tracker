import { MessagePattern, Payload } from "@nestjs/microservices";
import { HabitProgressService } from "./habitProgress.service";
import { Controller } from "@nestjs/common";



@Controller()
export class HabitProgressController {


    constructor(private readonly habitProgressService:HabitProgressService ){}
    
    @MessagePattern('compleetProgress')
    compleeteProgress(@Payload() data:{id:string,userId:string}){
     
         
        return this.habitProgressService.compleeteProgress(data.id,data.userId)
    }
   

}