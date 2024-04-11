import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusercase.interface";
import PetTokens from "../pet.tokens";
import DeletePetByIdUseCaseInput from "./dtos/delete.pet.by.id.usecase.input";
import DeletePetByIdUseCaseOutput from "./dtos/delete.pet.by.id.usecase.output";
import IPetRepository from "../interfaces/pet.repository.interface";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import { Pet } from "../schemas/pet.schema";

@Injectable()
export default class DeletePetByIdUseCase implements IUseCase<DeletePetByIdUseCaseInput, DeletePetByIdUseCaseOutput> {

     constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository
      ){}

    async run(input: DeletePetByIdUseCaseInput): Promise<DeletePetByIdUseCaseOutput> {
        
        console.log( 'UseCase 1: ' + input.id)
        const pet = await this.getPetById(input.id)   
        if (!pet) {
            new PetNotFoundError();
        }      

        console.log( 'UseCase 2: ' + input.id)
        await this.petRepository.deletePetById(input.id) 

        console.log( 'UseCase Pós Delte ')
        return new DeletePetByIdUseCaseOutput()
    }

    private async getPetById(id: string): Promise<Pet> {      
        try {
            return await this.petRepository.getById(id)           
        } catch (error) {
            return null  
        }     
    }
}