import CreatePetUseCaseOutput from "./create.pet.usecase.output";

export class UpdatePetPhotoByIdUseCaseOutput extends CreatePetUseCaseOutput {

    constructor(data: Partial<UpdatePetPhotoByIdUseCaseOutput>) {
        super(data)
        Object.assign(this, data);
    }
}