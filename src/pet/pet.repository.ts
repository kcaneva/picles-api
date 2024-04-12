import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import IPetRepository from "./interfaces/pet.repository.interface";
import { Pet } from "./schemas/pet.schema";
import GetPetsUseCaseInput from "./usecases/dtos/get.pets.usecase.input";
import { GetPetsByFilterAndTotal } from "./usecases/dtos/get.pets.by.filter.and.total";

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

    async getByFilter(input: GetPetsUseCaseInput): Promise<GetPetsByFilterAndTotal> {
        const FIRST_PAGE = 1;
        const skip = input.page == FIRST_PAGE ? 0 : input.itemsPerPage *(input.page -1);

        let query = this.petModel.find();

        if (input.type) {
            query.find({ type: input.type })
        }
        if (input.size) {
            query.find({ size: input.size })
        }
        if (input.gender) {
            query.find({ gender: input.gender })
        }    

        const totalQuery = query.clone().countDocuments();
        const skipQuery = query.clone().skip(skip).limit(input.itemsPerPage);

        const [items, total] = await Promise.all([
                skipQuery.exec(),
                totalQuery.exec(),
        ]);

        return new GetPetsByFilterAndTotal( {items, total} );
    
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
