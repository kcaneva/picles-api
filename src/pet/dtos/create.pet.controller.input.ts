import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export default class CreatePetControllerInput {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Nome do Pet" })
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Tipo do Pet", enum: ['Dog', 'Cat'] })
    type: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Tamanho do Pet", enum: ['Small', 'Medium', 'Large'] })
    size: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Genero do Pet", enum: ['Male', 'Female'] })
    gender: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(1024)
    @ApiProperty({ description: "Descrição do Pet", maximum: 1024 })
    bio: string
}