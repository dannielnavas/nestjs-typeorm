import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'the password of user' })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the role of user' })
  readonly role: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
