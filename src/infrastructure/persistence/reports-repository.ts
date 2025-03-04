import {IReportsRepository} from '../interfaces/reports-repository.interface';
import {injectable} from 'inversify';
import {Order} from '../../domain/entities/order';

@injectable()
/**
 * ReportsRepository
 */
export class ReportsRepository implements IReportsRepository {
  // @ts-ignore
  private readonly dbSecretsArn: string;
  // @ts-ignore
  private readonly dbHostName: string;

  /**
   * constructor
   */
  constructor() {
    this.dbHostName = process.env.REPORTS_DB_HOSTNAME || '';
    this.dbSecretsArn = process.env.REPORTS_DB_SECRET_ARN || '';
  }

  /**
   * getOrder
   * @param {string} customerId
   * @param {string} orderId
   * @returns {Promise<Order>}
   */
  async getOrder(customerId: string, orderId: string): Promise<any> {
    console.info('Entered ReportsRepository.getOrder');
    console.warn('Pending Implementation')
  }

  /**
   * upsertOrder
   * @param {Order} o
   * @returns {Promise<Order>}
   */
  async upsertOrder(o: Order): Promise<any> {
    console.info('Entered ReportsRepository.upserOrder');
    console.warn('Pending Implementation');
  }

}
