import { Inject, Injectable } from "@nestjs/common"
import { IUseCase } from "src/domain/iusercase.interface"
import CreatePetControllerInput from "../dtos/create.pet.controller.input"
import CreatePetUseCaseOutput from "./dtos/create.pet.usecase.output"
import PetTokens from "../pet.tokens"
import IPetRepository from "../interfaces/pet.repository.interface"

@Injectable()
export default class CreatePetUseCase implements IUseCase<CreatePetControllerInput, CreatePetUseCaseOutput> {

     constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository
      ){}

    async run(input: CreatePetControllerInput): Promise<CreatePetUseCaseOutput> {
         const newPet = await this.petRepository.create(input)
         return new CreatePetUseCaseOutput({
          id: newPet._id,
          name: newPet.name,
          type: newPet.type,
          size: newPet.size,
          gender: newPet.gender,
          bio: newPet.bio,
          photo: newPet.photo,
          createdAt: newPet.createdAt,
          updatedAt: newPet.updatedAt,    
         })
    }
}