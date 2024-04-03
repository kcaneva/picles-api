import { IUseCase } from "../../domain/iusercase.interface";
import GetShelderDetailsUseCaseOutput from "./dtos/get.shelter.details.usecase.output";

export default class GetShelderDetailsUseCase implements IUseCase<null, GetShelderDetailsUseCaseOutput> {
    run(input: null): Promise<GetShelderDetailsUseCaseOutput> {
        return Promise.resolve(new GetShelderDetailsUseCaseOutput({
            shelterName: 'Abrigo',
            shelterEmail: 'abrigo@gmail.com',
            shelterPhone: '1934341234',
            shelterWhatApp: '19991470000',
            createAt: new Date(),
            updateAt: new Date()
            }));
    }
}