import { Pet } from "../schemas/pet.schema";

export default interface IPetRepository {
    create(data: Partial<Pet>): Promise<Pet>; 
    getById(id: string): Promise<Pet>;
    updatePetById(data: Partial<Pet>): Promise<void>;
    deletePetById(id: string): Promise<void>
}