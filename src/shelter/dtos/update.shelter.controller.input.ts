import { IsEmail, IsEmpty, IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from "class-validator"

export default class UpdateShelterControllerInput {
    @IsString()
    @IsNotEmpty()
    name: string
 
    @IsNumberString()
    @Length(10,11)
    @IsNotEmpty()
    whatsapp: string
 
    @IsNumberString()
    @Length(10,11)
    @IsNotEmpty()
    phone: string

    @IsEmail()
    @IsNotEmpty()
    email: string    
}