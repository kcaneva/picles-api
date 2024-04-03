import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import ShelterTokens from './shelters.tokens';
import GetShelderDetailsUseCase from './usecases/get.shelter.details.usecase';

@Module({
  controllers: [ShelterController],
  providers: [
    {
      provide: ShelterTokens.GetShelterDetailsUseCase,
      useClass: GetShelderDetailsUseCase 
    },
  ]
})
export class ShelterModule {}
