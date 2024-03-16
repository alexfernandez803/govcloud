import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @MinLength(2, { message: 'addressLine1 must have atleast 2 characters.' })
  @IsNotEmpty()
  addressLine1: string;

  @IsString()
  addressLine2: string;

  @IsString()
  @MinLength(2, { message: 'barangay must have atleast 2 characters.' })
  barangay: string;

  @IsString()
  @MinLength(2, { message: 'barangay must have atleast 2 characters.' })
  city: string;

  @IsNumber()
  assessedValue: number;

  @IsNumber()
  lotSize: number;

  @IsString()
  @MinLength(2, { message: 'description must have atleast 2 characters.' })
  description: string;

  @IsString()
  remarks: string;
}
