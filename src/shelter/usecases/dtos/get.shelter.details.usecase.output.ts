export default class GetShelderDetailsUseCaseOutput {
    shelterName: string
    shelterWhatApp: string
    shelterEmail: string
    shelterPhone: string
    createAt: Date
    updateAt: Date

    constructor(data: Partial<GetShelderDetailsUseCaseOutput>) {
        Object.assign(this, data)
    }

}
