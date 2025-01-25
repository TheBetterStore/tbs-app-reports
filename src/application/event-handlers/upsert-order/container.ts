import {Container} from 'inversify';
import TYPES from '../../../infrastructure/types';
import {ReportsRepository} from '../../../infrastructure/persistence/reports-repository';
import {IParameterStoreClient} from '../../../infrastructure/interfaces/parameterstore-client.interface';
import {ParameterStoreClient} from '../../../infrastructure/adapters/aws/parameterstore-client';
import {IReportsRepository} from "../../../infrastructure/interfaces/reports-repository.interface";
import {IAppReportsService} from "../../services/app-reports-service.interface";
import {AppReportsService} from "../../services/app-reports-service";

const container = new Container();

container.bind<IReportsRepository>(TYPES.IReportsRepository).to(ReportsRepository).inSingletonScope();
container.bind<IAppReportsService>(TYPES.IAppReportsService).to(AppReportsService).inSingletonScope();
container.bind<IParameterStoreClient>(TYPES.IParameterStoreClient).to(ParameterStoreClient).inSingletonScope();

export default container;
