import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import IPetRepository from "./interfaces/pet.repository.interface";
import { Pet } from "./schemas/pet.schema";

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

    async updatePetById(data: Partial<Pet>): Promise<void>
    {
        await this.petModel.updateOne( 
            {"_id": data._id }, 
            {
            ...data,
            updatedAt: new Date()
            }
        )
    }

    async updatePetPhotoById(data: Partial<Pet>): Promise<void>
    {
        await this.petModel.updateOne( 
            {"_id": data._id }, 
            {
            ...data,
            updatedAt: new Date()
            }
        )
    }
    async deletePetById(id: string): Promise<void>
    {
        return await this.petModel.findByIdAndDelete(id)
    }
}
