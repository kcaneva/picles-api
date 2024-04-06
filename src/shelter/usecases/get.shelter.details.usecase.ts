import { Inject } from "@nestjs/common";
import { IUseCase } from "../../domain/iusercase.interface";
import GetShelterDetailsUseCaseOutput from "./dtos/get.shelter.details.usecase.output";
import ShelterTokens from "../shelter.tokens";
import IShelterRepository from "../interfaces/shelter.repository.interface";

export default class GetShelterDetailsUseCase implements IUseCase<null, GetShelterDetailsUseCaseOutput> {

    constructor(
        @Inject(ShelterTokens.shelterRepository)
        private readonly shelterRepository: IShelterRepository
      ){}

   async run(input: null): Promise<GetShelterDetailsUseCaseOutput> {
        const shelter = await this.shelterRepository.get();
        return new GetShelterDetailsUseCaseOutput({
            shelterName: shelter.name,
            shelterEmail: shelter.email,
            shelterPhone: shelter.phone,
            shelterWhatApp: shelter.whatsApp,
            createdAt: shelter.createdAt,
            updatedAt: shelter.updatedAt,
        });
    }
}