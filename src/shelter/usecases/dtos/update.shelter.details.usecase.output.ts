export default class UpdateShelterDetailsUseCaseOutput {
    shelterName: string
    shelterWhatApp: string
    shelterEmail: string
    shelterPhone: string
    createdAt: Date
    updatedAt: Date

    constructor(data: Partial<UpdateShelterDetailsUseCaseOutput>) {
        Object.assign(this, data)
    }

}
