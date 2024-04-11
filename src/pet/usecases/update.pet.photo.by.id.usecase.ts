import { IUseCase } from "src/domain/iusercase.interface";
import { Inject, Injectable } from "@nestjs/common";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import { Pet } from "../schemas/pet.schema";
import { UpdatePetPhotoByIdUseCaseInput } from "./dtos/update.pet.photo.by,is.usecase.input";
import { UpdatePetPhotoByIdUseCaseOutput } from "./dtos/update.pet.photo.by,is.usecase.output";

@Injectable()
export default class UpdatePetPhotoByIdUseCase implements IUseCase<UpdatePetPhotoByIdUseCaseInput, UpdatePetPhotoByIdUseCaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository
      ){}
      
    async run(input: UpdatePetPhotoByIdUseCaseInput): Promise<UpdatePetPhotoByIdUseCaseOutput> {
     
        let pet = await this.getPetById(input.id)   
        if (!pet) {
            throw new PetNotFoundError();
        }         
       
        await this.petRepository.updatePetPhotoById({ 
            _id: input.id,
            photo: input.photoPath
        })

        pet = await this.petRepository.getById(input.id)

        return new UpdatePetPhotoByIdUseCaseOutput({
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