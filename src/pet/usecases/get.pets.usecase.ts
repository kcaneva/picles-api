import { Inject, Injectable } from "@nestjs/common"
import { IUseCase } from "src/domain/iusercase.interface"
import PetTokens from "../pet.tokens"
import IPetRepository from "../interfaces/pet.repository.interface"
import AppTokens from "src/app.tokens"
import IFileService from "src/interfaces/file.services.interface"
import GetPetsUseCaseInput from "./dtos/get.pets.usecase.input"
import GetPetsUseCaseOutput from "./dtos/get.pets.usecase.output"

@Injectable()
export default class GetPetsUseCase implements IUseCase<GetPetsUseCaseInput, GetPetsUseCaseOutput> {

     constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,
        
        @Inject(AppTokens.fileService)
        private readonly fileService: IFileService
      ){}

    async run(input: GetPetsUseCaseInput): Promise<GetPetsUseCaseOutput> {
        
        // const pet = await this.petRepository.getPets(input)   

        // const petPhoto = !!pet.photo ? (await this.fileService.readFile(pet.photo)).toString('base64') : null;

        return new GetPetsUseCaseOutput({
        //   id: pet._id,
        //   name: pet.name,
        //   type: pet.type,
        //   size: pet.size,
        //   gender: pet.gender,
        //   bio: pet.bio,
        //   photo: petPhoto,
        //   createdAt: pet.createdAt,
        //   updatedAt: pet.updatedAt,    
         })
    }

}