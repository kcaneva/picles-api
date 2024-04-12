import { IUseCase } from "src/domain/iusercase.interface";
import { Inject, Injectable } from "@nestjs/common";
import UpdatePetByIdUseCaseOutput from "./dtos/update.pet.by.Id.usecase.output";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import UpdatePetByIdUseCaseInput from "./dtos/update.pet.by.Id.usecase.input";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import { Pet } from "../schemas/pet.schema";
import AppTokens from "src/app.tokens";
import IFileService from "src/interfaces/file.services.interface";

@Injectable()
export default class UpdatePetByIdUseCase implements IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,

        @Inject(AppTokens.fileService)
        private readonly fileService: IFileService
      ){}
      
    async run(input: UpdatePetByIdUseCaseInput): Promise<UpdatePetByIdUseCaseOutput> {
     
        let pet = await this.getPetById(input.id)   
        if (!pet) {
            throw new PetNotFoundError();
        }         
       
        await this.petRepository.updatePetById({ 
            ...input, 
            _id: input.id 
        })

        pet = await this.petRepository.getById(input.id)

        const petPhoto = !!pet.photo ? (await this.fileService.readFile(pet.photo)).toString('base64') : null;

        return new UpdatePetByIdUseCaseOutput({
            id: pet._id,
            name: pet.name,
            type: pet.type,
            size: pet.size,
            gender: pet.gender,
            bio: pet.bio,
            photo: petPhoto,
            createdAt: pet.createdAt,
            updatedAt: pet.updatedAt,   
        })
    }
    
    private async getPetById(id: string): Promise<Pet> {      
        try {
            return await this.petRepository.getById(id)           
        } catch (error) {
            return null  
        }     
    }
}