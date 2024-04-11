import CreatePetUseCaseOutput from "./create.pet.usecase.output";

export default class UpdatePetByIdUseCaseOutput extends CreatePetUseCaseOutput {
    
    constructor(data: Partial<UpdatePetByIdUseCaseOutput>) {
        super(data)
        Object.assign(this, data);
    }
}