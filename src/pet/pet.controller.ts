import { Body, Controller, Inject, Post, Get, Put, Param, BadRequestException } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import CreatePetUseCaseOutput from './usecases/dtos/create.pet.usecase.output';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import GetPetByIdUseCaseOutput from './usecases/dtos/get.pet.by.id.usecase.output';
import GetPetByIdUseCaseInput from './usecases/dtos/get.pet.by.id.usecase.input';
import PetTokens from './pet.tokens';
import { IUseCase } from 'src/domain/iusercase.interface';
import UpdatePetByIdControllerInput from './dtos/update.pet.by.id.controller.input';
import UpdatePetByIdUseCaseOutput from './usecases/dtos/update.pet.by.Id.usecase.output';
import { Pet } from './schemas/pet.schema';
import UpdatePetByIdUseCaseInput from './usecases/dtos/update.pet.by.Id.usecase.input';


@Controller('pet')
export class PetController{

    @Inject(PetTokens.createPetUseCase)
    private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput,CreatePetUseCaseOutput>
    
    @Inject(PetTokens.getPetByIdUseCase)
    private readonly getPetByIdUseCase: IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput> 

    @Inject(PetTokens.updatePetByIdUseCase)
    private readonly updatePetByIdUseCase: IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput> 

    @Post()
    async createPet(@Body() input: CreatePetControllerInput): Promise<CreatePetUseCaseOutput>
    {
        const useCaseInput = new CreatePetUseCaseInput({ ...input } )
        return await this.createPetUseCase.run(useCaseInput)
    }

    @Get(':id')
    async getPetById(@Param('id') id: string): Promise<GetPetByIdUseCaseOutput>
    {
        try {
            const useCaseInput = new GetPetByIdUseCaseInput({ id })
            return await this.getPetByIdUseCase.run(useCaseInput)           
        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message))         
        }
    }

    @Put(':id')
    async updatePetById(@Param('id') id: string, @Body() input: UpdatePetByIdControllerInput): Promise<UpdatePetByIdUseCaseOutput>
    {
       const useCaseInput = new UpdatePetByIdUseCaseInput({ id, ...input });
       return await this.updatePetByIdUseCase.run(useCaseInput)
    }
    
}
