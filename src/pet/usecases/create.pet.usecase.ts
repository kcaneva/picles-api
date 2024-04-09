import { Inject, Injectable } from "@nestjs/common"
import { IUseCase } from "src/domain/iusercase.interface"
import CreatePetControllerInput from "../dtos/create.pet.controller.input"
import CreatePetUseCaseOutput from "./dtos/create.pet.usecase.output"
import PetTokens from "../pet.tokens"
import IPetRepository from "../interfaces/pet.repository.interface"

@Injectable()
export default class CreatePetsUseCase implements IUseCase<CreatePetControllerInput, CreatePetUseCaseOutput> {

     constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository
      ){}

    async run(input: CreatePetControllerInput): Promise<CreatePetUseCaseOutput> {
         return await this.petRepository.create(input)

    //      const shelter = await this.petRepository.get()

    //     return new CreatePetUseCaseOutput({
    //         name: pet.name,


    //         createdAt: pet.createdAt,
    //         updatedAt: pet.updatedAt
    //     })
    }
}