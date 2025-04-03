import {IReportsRepository} from '../interfaces/reports-repository.interface';
import {injectable} from 'inversify';
import {OrderItem, PrismaClient} from '../../generated/prisma';
import {OrderDto} from "./order.dto";

@injectable()
/**
 * ReportsRepository
 */
export class ReportsRepository implements IReportsRepository {
  // @ts-ignore
  private readonly dbSecretsArn: string;
  // @ts-ignore
  private readonly dbHostName: string;

  private prisma;

  /**
   * constructor
   */
  constructor() {
    this.dbHostName = process.env.REPORTS_DB_HOSTNAME || '';
    this.dbSecretsArn = process.env.REPORTS_DB_SECRET_ARN || '';
    this.prisma = new PrismaClient();
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
  async upsertOrder(o: OrderDto): Promise<any> {
    console.info('Entered AppReportsService.upsertOrder');

    let res;

    try {
      res = await this.prisma.Order.create({
        data: {
          orderId: o.OrderId,
          customerId: o.CustomerId,
          receiptEmail: o.ReceiptEmail,
          amountCharged: o.AmountCharged,
          netTotal: o.NetTotal,
          grossTotal: o.GrossTotal,
          taxRate: o.TaxRate,
          createdTime: new Date(o.CreatedTime),
          lastUpdatedTime: new Date(o.LastUpdatedTime),
          status: o.Status,
          stripePaymentIntentId: o.StripePaymentIntent?.Id,
          stripePaymentIntentStatus: o.StripePaymentIntent?.Status
        }
      });
      await this.prisma.$disconnect();
    } catch(e: any) {
        console.error(e);
        await this.prisma.$disconnect();
    }

    return res;
  }

  toOrderItemDto(o: OrderItem): OrderItem {
    const r = new this.prisma.OrderItem(
      {

      }
    );
    return r;
  }
}
