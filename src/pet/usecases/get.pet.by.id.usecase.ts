import { Inject, Injectable } from "@nestjs/common"
import { IUseCase } from "src/domain/iusercase.interface"
import PetTokens from "../pet.tokens"
import IPetRepository from "../interfaces/pet.repository.interface"
import GetPetByIdUseCaseOutput from "./dtos/get.pet.by.id.usecase.output"
import GetPetByIdUseCaseInput from "./dtos/get.pet.by.id.usecase.input"
import { Pet } from "../schemas/pet.schema"
import PetNotFoundError from "src/domain/errors/pet.not.found.error"

@Injectable()
export default class GetPetByIdUseCase implements IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput> {

     constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository
      ){}

    async run(input: GetPetByIdUseCaseInput): Promise<GetPetByIdUseCaseOutput> {
        
        const pet = await this.getPetById(input.id)   
        if (!pet) {
            new PetNotFoundError();
        }      
         
         return new GetPetByIdUseCaseOutput({
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