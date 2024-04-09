import { IUseCase } from "src/domain/iusercase.interface";
import UpdateShelterControllerInput from "../dtos/update.shelter.controller.input";
import UpdateShelterDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import ShelterTokens from "../shelter.tokens";
import IShelterRepository from "../interfaces/shelter.repository.interface";

@Injectable()
export default class UpdateShelterDetailsUseCase implements IUseCase<UpdateShelterControllerInput, UpdateShelterDetailsUseCaseOutput> {

    constructor(
        @Inject(ShelterTokens.shelterRepository)
        private readonly shelterRepository: IShelterRepository
      ){}
      
    async run(input: UpdateShelterControllerInput): Promise<UpdateShelterDetailsUseCaseOutput> {
        await this.shelterRepository.update(input)

        const shelter = await this.shelterRepository.get()

        return new UpdateShelterDetailsUseCaseOutput({
            name: shelter.name,
            phone: shelter.phone,
            whatsApp: shelter.whatsApp,
            email: shelter.email,
            createdAt: shelter.createdAt,
            updatedAt: shelter.updatedAt
        })
    }
}