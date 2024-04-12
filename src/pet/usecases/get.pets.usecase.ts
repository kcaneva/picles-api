import { Inject, Injectable } from "@nestjs/common"
import { IUseCase } from "src/domain/iusercase.interface"
import PetTokens from "../pet.tokens"
import IPetRepository from "../interfaces/pet.repository.interface"
import AppTokens from "src/app.tokens"
import IFileService from "src/interfaces/file.services.interface"
import GetPetsUseCaseInput from "./dtos/get.pets.usecase.input"
import GetPetsUseCaseOutput from "./dtos/get.pets.usecase.output"
import { PetResponse } from "../dtos/pet.response"

@Injectable()
export default class GetPetsUseCase implements IUseCase<GetPetsUseCaseInput, GetPetsUseCaseOutput> {

     constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,
        
        @Inject(AppTokens.fileService)
        private readonly fileService: IFileService
      ){}

    async run(input: GetPetsUseCaseInput): Promise<GetPetsUseCaseOutput> {
        
        const queryResponse = await this.petRepository.getByFilter(input)   

        const petResponseList: PetResponse[] = [];

        for (const pet of queryResponse.items) {
          if (pet.photo) {
            const photoInBase64 = await this.fileService.readFile(pet.photo);
            pet.photo = photoInBase64.toString('base64');
          }

          petResponseList.push(PetResponse.fromPet(pet));
        }

        const totalPages = Math.ceil(queryResponse.total / input.itemsPerPage);

        return new GetPetsUseCaseOutput({
          currentPage: input.page,
          totalPages,
          items: petResponseList
        })
    }

}