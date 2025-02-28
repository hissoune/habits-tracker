import { CreateChalengeDto } from "../../dto/create-chalenge.dto";
import { Challenge } from "../../schemas/chalenge.schema";
import { chalengeService } from "../chalenges-service";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ChalengeServiceImplimentation implements chalengeService {
    constructor(
        @InjectModel(Challenge.name) private readonly challengeModel: Model<Challenge>
    ) {}

    async createChalenge(chalenge: CreateChalengeDto): Promise<Challenge> {
        const createdChallenge = new this.challengeModel(chalenge);
        return createdChallenge.save();
    }
}

