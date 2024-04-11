import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import PetTokens from './pet.tokens';
import CreatePetUseCase from './usecases/create.pet.usecase';
import { Pet, PetSchema } from './schemas/pet.schema';
import { MongooseModule } from '@nestjs/mongoose';
import PetRepository from './pet.repository';
import GetPetByIdUseCase from './usecases/get.pet.by.id.usecase';
import UpdatePetByIdUseCase from './usecases/update.pet.by.id.usecase';

@Module({
  controllers: [PetController],
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }])
  ],
  providers: [
    {
      provide: PetTokens.petRepository,
      useClass: PetRepository,
    },
    {
      provide: PetTokens.createPetUseCase,
      useClass: CreatePetUseCase, 
    },
    {
      provide: PetTokens.getPetByIdUseCase,
      useClass: GetPetByIdUseCase, 
    },  
    {
      provide: PetTokens.updatePetByIdUseCase,
      useClass: UpdatePetByIdUseCase, 
    },    ]
})
export class PetModule {}
