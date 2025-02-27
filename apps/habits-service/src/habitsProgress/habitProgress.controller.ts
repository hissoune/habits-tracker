import { MessagePattern, Payload } from "@nestjs/microservices";
import { HabitProgressService } from "./habitProgress.service";
import { Controller, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { AuthguardGuard } from "../authguard/authguard.guard";



@Controller('progress')
export class HabitProgressController {


    constructor(private readonly habitProgressService:HabitProgressService ){}
    
//     @MessagePattern('compleetProgress')
//     compleeteProgress(@Payload() data:{id:string,userId:string}){
    
         
//         return this.habitProgressService.compleeteProgress(data.id,data.userId)
//     }

//     @MessagePattern('get-progress')
//     getProgress(@Payload() data:{habitId:string,userId:string}){
//    return  this.habitProgressService.getProgress(data.habitId, data.userId)
//     }

//  @Post()
//   create(@Body() createProgressDto: CreateProgressDto) {
//     return this.habitProgressService.create(createProgressDto);
//   }

//   @Get()
//   findAll() {
//     return this.habitProgressService.findAll();
//   }

  @Get('/:habitId')
    @UseGuards(AuthguardGuard)
  findOne(@Req() req,@Param('habitId') habitId: string) {
    
    const userId = req.user.id
    
    return this.habitProgressService.getProgress(habitId,userId);
  }

  @Patch('compleet/:id')
  @UseGuards(AuthguardGuard)
  update(@Req() req,@Param('id') id: string) {
    const userId = req.user.id
    
    return this.habitProgressService.compleeteProgress(id,userId);
  }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.habitProgressService.remove(+id);
//   }
   

}