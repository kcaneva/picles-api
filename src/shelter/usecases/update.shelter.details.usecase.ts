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
        throw new Error("Method no implement");

    }
}