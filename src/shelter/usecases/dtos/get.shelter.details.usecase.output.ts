export default class GetShelterDetailsUseCaseOutput {
    shelterName: string
    shelterWhatApp: string
    shelterEmail: string
    shelterPhone: string
    createdAt: Date
    updatedAt: Date

    constructor(data: Partial<GetShelterDetailsUseCaseOutput>) {
        Object.assign(this, data)
    }

}
