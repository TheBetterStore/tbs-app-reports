import {IReportsRepository} from '../interfaces/reports-repository.interface';
import {injectable} from 'inversify';
import {Logger} from '@thebetterstore/tbs-lib-infra-common/lib/logger';
import {Order} from '../../domain/entities/order';
import {OrderDto, OrderItemDto} from './order.dto';
import {OrderItemVO} from "../../domain/models/order-item.vo";

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
    Logger.info('Entered ReportsRepository.getOrder');
    Logger.warn('Pending Implementation')
  }

  /**
   * upsertOrder
   * @param {Order} o
   * @returns {Promise<Order>}
   */
  async upsertOrder(o: Order): Promise<any> {
    Logger.info('Entered ReportsRepository.upserOrder');
    Logger.warn('Pending Implementation');
  }

  /**
   * toDto
   * @param {Order} o
   * @returns {OrderDto}
   */
  static toDto(o: Order): OrderDto {
    const d: OrderDto = {
      OrderId: o.orderId,
      CustomerId: o.customerId,
      ReceiptEmail: o.receiptEmail,
      OrderItems: o.orderItems.map(toOrderItemDto),
      CreatedTime: o.createdTime,
      LastUpdatedTime: o.lastUpdatedTime,
      TaxRate: o.taxRate,
      AmountCharged: o.amountCharged,
      Status: o.status,
      TaxTotal: o.getTaxTotal(),
      NetTotal: o.getNetTotal(),
      GrossTotal: o.getGrossTotal(),
      StripePaymentIntent: {
        Id: o.stripePaymentIntent.id,
        Status: o.stripePaymentIntent.status,
      }
    };
    return d;
  }
}

/**
 * toOrder
 * @param {OrderDto} o
 * @returns {Order}
 */
// function toOrder(o: OrderDto): Order {
//   const d: Order = new Order(o.OrderId || '', o.CustomerId, o.ReceiptEmail || '',
//       o.OrderItems.map(toOrderItemVO as any), o.CreatedTime,
//       o.LastUpdatedTime, o.TaxRate, o.AmountCharged, o.Status);
//   d.stripePaymentIntent.id = o.StripePaymentIntent.Id;
//   d.stripePaymentIntent.status = o.StripePaymentIntent.Status;
//   return d;
// }

/**
 * toOrderItemDto
 * @param {OrderItemVO} o
 * @returns {OrderItemDto}
 */
function toOrderItemDto(o: OrderItemVO): OrderItemDto {
  const d: OrderItemDto = {
    Quantity: o.quantity,
    ProductId: o.productId,
    ProductName: o.productName,
    Price: o.price,
  };
  return d;
}

// @ts-ignore
function toOrderItemVO(o: OrderItemDto): OrderItemVO {
  const d: OrderItemVO = {
    quantity: o.Quantity,
    productId: o.ProductId,
    productName: o.ProductName,
    price: o.Price,
  };
  return d;
}
