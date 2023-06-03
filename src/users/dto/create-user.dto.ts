import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Alibek' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: '12345' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'alibek0493@mail.ru' })
  @IsNotEmpty()
  readonly password: string;
}
