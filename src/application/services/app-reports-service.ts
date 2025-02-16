import {inject, injectable} from 'inversify';
import TYPES from '../../infrastructure/types';
import {OrderViewModel} from '../viewmodels/order-viewmodel';
import {IParameterStoreClient} from '../../infrastructure/interfaces/parameterstore-client.interface';
import {IAppReportsService} from "./app-reports-service.interface";
import {IReportsRepository} from "../../infrastructure/interfaces/reports-repository.interface";
import {IDbParamsBuilder} from "../../infrastructure/persistence/dbparams-builder.interface";

@injectable()
/**
 * OrderService
 */
export class AppReportsService implements IAppReportsService {
  // @ts-ignore
  private repo: IReportsRepository;
  // @ts-ignore
  private parameterStoreClient: IParameterStoreClient;
  private dbParamsBuilder: IDbParamsBuilder;

  /**
   * constructor
   * @param {IRestApiClient} restApiClient
   * @param {IEventBridgeClient} eventBridgeClient
   * @param {IParameterStoreClient} parameterStoreClient
   * @param {IOrderRepository} repo
   */
  constructor(@inject(TYPES.IParameterStoreClient) parameterStoreClient: IParameterStoreClient,
              @inject(TYPES.IDbParamsBuilder) dbParamsBuilder: IDbParamsBuilder,
              @inject(TYPES.IReportsRepository) repo: IReportsRepository) {
    this.parameterStoreClient = parameterStoreClient;
    this.repo = repo;
    this.dbParamsBuilder = dbParamsBuilder;
  }

  /**
   * getOrder
   * @param {string} customerId
   * @param {string} orderId
   * @returns {Promise}
   */
  async getOrder(customerId: string, orderId: string): Promise<OrderViewModel> {
    console.info('Entered getOrder');
    console.warn('Not yet implemented');
    return new Promise<OrderViewModel>((resolve, reject) => {});
  }

  /**
   * createOrder; Initialise customer order, create Strip PaymentIntent, and return this to the client if no errors to
   * allow payment to be confirmed
   * @param {OrderViewModel} o
   * @returns {Promise}
   */
  async upsertOrder(o: OrderViewModel) {
    console.info('Entered AppReportsService.upsertOrder');
    const dbParams = await this.dbParamsBuilder.getDbParams(process.env);
    console.debug('params:', dbParams);

    console.warn('Not yet implemented');
    // return new Promise<OrderViewModel>((resolve, reject) => {});
  }

}
