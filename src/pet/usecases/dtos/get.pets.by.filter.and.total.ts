import { Pet } from "src/pet/schemas/pet.schema";

export class GetPetsByFilterAndTotal {
    items: Pet[];
    total: number;

    constructor(data: Partial<GetPetsByFilterAndTotal>) {
        Object.assign(this,data);
    }
}