import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import ShelterTokens from './shelter.tokens';
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
