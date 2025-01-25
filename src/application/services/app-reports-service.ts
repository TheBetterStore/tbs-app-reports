import {inject, injectable} from 'inversify';
import TYPES from '../../infrastructure/types';
import {Logger} from '@thebetterstore/tbs-lib-infra-common/lib/logger';
import {OrderViewModel} from '../viewmodels/order-viewmodel';
import {IParameterStoreClient} from '../../infrastructure/interfaces/parameterstore-client.interface';
import {IAppReportsService} from "./app-reports-service.interface";
import {IReportsRepository} from "../../infrastructure/interfaces/reports-repository.interface";

@injectable()
/**
 * OrderService
 */
export class AppReportsService implements IAppReportsService {
  // @ts-ignore
  private repo: IReportsRepository;
  // @ts-ignore
  private parameterStoreClient: IParameterStoreClient;

  /**
   * constructor
   * @param {IRestApiClient} restApiClient
   * @param {IEventBridgeClient} eventBridgeClient
   * @param {IParameterStoreClient} parameterStoreClient
   * @param {IOrderRepository} repo
   */
  constructor(@inject(TYPES.IParameterStoreClient) parameterStoreClient: IParameterStoreClient,
              @inject(TYPES.IReportsRepository) repo: IReportsRepository) {
    this.parameterStoreClient = parameterStoreClient;
    this.repo = repo;
  }

  /**
   * getOrder
   * @param {string} customerId
   * @param {string} orderId
   * @returns {Promise}
   */
  async getOrder(customerId: string, orderId: string): Promise<OrderViewModel> {
    Logger.info('Entered getOrder');
    Logger.warn('Not yet implemented');
    return new Promise<OrderViewModel>((resolve, reject) => {});
  }

  /**
   * createOrder; Initialise customer order, create Strip PaymentIntent, and return this to the client if no errors to
   * allow payment to be confirmed
   * @param {OrderViewModel} o
   * @returns {Promise}
   */
  async upsertOrder(o: OrderViewModel): Promise<OrderViewModel> {
    Logger.info('Entered AppReportsService.upsertOrder');

    Logger.warn('Not yet implemented');
    return new Promise<OrderViewModel>((resolve, reject) => {});
  }

}
