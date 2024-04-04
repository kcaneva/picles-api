import { IsEmail, IsEmpty, IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from "class-validator"

export default class UpdateShelderControllerInput {
    @IsString()
    @IsNotEmpty()
    name: string
 
    @IsOptional()
    @IsNumberString()
    @Length(10,11)
    @IsNotEmpty()
    whatapp: string
 
    @IsOptional()
    @IsNumberString()
    @Length(10,11)
    @IsNotEmpty()
    phone: string

    @IsEmail()
    @IsNotEmpty()
    email: string    
}