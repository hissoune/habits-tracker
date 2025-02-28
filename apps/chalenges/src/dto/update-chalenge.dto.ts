import { PartialType } from '@nestjs/mapped-types';
import { CreateChalengeDto } from './create-chalenge.dto';

export class UpdateChalengeDto extends PartialType(CreateChalengeDto) {}