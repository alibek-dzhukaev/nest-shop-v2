import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'Alibek' })
  username: string;

  @ApiProperty({ example: '12334' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty()
  user: {
    userId: number;
    username: string;
    password: string;
  };

  @ApiProperty({ example: 'logged in' })
  msg: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'session has ended' })
  msg: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Alibek' })
  username: string;

  @ApiProperty({ example: '12345' })
  password: string;
}

export class SignupResponse {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 'Alibek' })
  readonly username: string;

  @ApiProperty({
    example: '$2b$04$fXMxIxO1h4tj9hNpnPfUcuM4siD.FBpzETyZc2czqrAF711OR/8FG',
  })
  readonly password: string;

  @ApiProperty({ example: 'alibek0493@mail.ru' })
  readonly email: string;

  @ApiProperty({ example: '2023-05-31T06:52:22.962Z' })
  readonly updatedAt: string;

  @ApiProperty({ example: '2023-05-31T06:52:22.962Z' })
  readonly createdAt: string;
}
