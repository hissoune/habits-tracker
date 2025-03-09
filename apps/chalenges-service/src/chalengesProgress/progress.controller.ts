import { Controller, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { AuthguardGuard } from "../authguard/authguard.guard";
import { ProgressService } from "./progress.service";

@Controller('progress')
export class ProgressController{

    constructor(private readonly progressService:ProgressService){}

@Get('/:chalengeId')
@UseGuards(AuthguardGuard)
getParticipantProgress(@Param('chalengeId') chalengeId ,@Req() req){
      const userId = req.user.id;
      return this.progressService.getParticipantProgress(chalengeId, userId)
}

@Patch('/:id')
@UseGuards(AuthguardGuard)
completeParticipantProgress(@Param('id') id:string ,@Req() req){
    const userId = req.user.id;
   return this.progressService.completeProgress(id, userId)
}


}