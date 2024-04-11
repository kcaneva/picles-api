import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Body, Injectable, Put } from "@nestjs/common";
import IPetRepository from "./interfaces/pet.repository.interface";
import { Pet } from "./schemas/pet.schema";
import UpdatePetByIdUseCaseInput from "./usecases/dtos/update.pet.by.Id.usecase.input";
import UpdatePetByIdUseCaseOutput from "./usecases/dtos/update.pet.by.Id.usecase.output";

@Injectable()
export default class PetRepository implements IPetRepository {

    constructor(
        @InjectModel(Pet.name)
        private readonly petModel: Model<Pet>
    ) {}

    async create(data: Partial<Pet>): Promise<Pet> {
        return await this.petModel.create({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        })    
    }

    async getById(id: string): Promise<Pet> {
        return await this.petModel.findById(id)
    }   

    @Put()
    async updatePetById(data: Partial<Pet>): Promise<void>
    {
        console.log( data )
        await this.petModel.updateOne( 
            {"_id": data._id }, 
            {
            ...data,
            updatedAt: new Date()
            }
        )
    }

}
