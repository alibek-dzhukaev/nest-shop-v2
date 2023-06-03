import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MakePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly amount: number;
}
