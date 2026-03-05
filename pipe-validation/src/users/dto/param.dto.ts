import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class ParamDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;
}
