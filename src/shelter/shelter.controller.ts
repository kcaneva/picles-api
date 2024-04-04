import { Body, Controller, Get, Inject, Patch } from '@nestjs/common';
import GetShelderDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usecase.output';
import { IUseCase } from 'src/domain/iusercase.interface';
import ShelterTokens from './shelter.tokens';
import UpdateShelderControllerInput from './dtos/update.shelter.controller.input';

@Controller('shelter')
export class ShelterController {

    @Inject(ShelterTokens.GetShelterDetailsUseCase)
    private readonly getShelterDetailsUseCase: IUseCase<null, GetShelderDetailsUseCaseOutput> 

    @Get()
    async getShelterDetails(): Promise<GetShelderDetailsUseCaseOutput>
    {
        return await this.getShelterDetailsUseCase.run(null)
    }

    @Patch()
    async updateShelterDetails(@Body() input: UpdateShelderControllerInput)
    {
        console.log(input)
    }

}
