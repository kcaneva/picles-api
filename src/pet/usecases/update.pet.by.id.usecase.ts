import { IUseCase } from "src/domain/iusercase.interface";
import { Inject, Injectable } from "@nestjs/common";
import UpdatePetByIdUseCaseOutput from "./dtos/update.pet.by.Id.usecase.output";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import UpdatePetByIdUseCaseInput from "./dtos/update.pet.by.Id.usecase.input";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import { Pet } from "../schemas/pet.schema";

@Injectable()
export default class UpdatePetByIdUseCase implements IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository
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

        return new UpdatePetByIdUseCaseOutput({
            id: pet._id,
            name: pet.name,
            type: pet.type,
            size: pet.size,
            gender: pet.gender,
            bio: pet.bio,
            photo: pet.photo,
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