import { IsDateString } from "class-validator";

export class CreateChalengeDto {
    title: string;
    description: string;
    image?: string;
    creator?: string;
    participants?: { userId: string, progress: number }[];
    @IsDateString()
    endDate: string;
    @IsDateString()
    startDate: string;
  
}
