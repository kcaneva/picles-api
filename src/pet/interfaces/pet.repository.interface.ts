import { Pet } from "../schemas/pet.schema";
import { GetPetsByFilterAndTotal } from "../usecases/dtos/get.pets.by.filter.and.total";
import GetPetsUseCaseInput from "../usecases/dtos/get.pets.usecase.input";

export default interface IPetRepository {
    create(data: Partial<Pet>): Promise<Pet>; 
    getByFilter(input: GetPetsUseCaseInput): Promise<GetPetsByFilterAndTotal>;
    getById(id: string): Promise<Pet>;
    updatePetById(data: Partial<Pet>): Promise<void>;
    updatePetPhotoById(data: Partial<Pet>): Promise<void>;
    deletePetById(id: string): Promise<void>
}