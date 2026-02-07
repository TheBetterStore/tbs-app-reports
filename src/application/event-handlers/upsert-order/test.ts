import 'reflect-metadata';
import TYPES from '../../../infrastructure/types';
import container from './container';
import {SQSEvent, SQSRecord} from 'aws-lambda';
import {Logger} from '@thebetterstore/tbs-lib-infra-common/lib/logger';
import {IAppReportsService} from "../../services/app-reports-service.interface";

console.log('INFO - lambda is cold-starting.');
const handler = async (event: SQSEvent) => {
  // Logger.info('Entered confirm-order handler', event);

  const svc = container.get<IAppReportsService>(TYPES.IAppReportsService);

  const recs = event.Records;
  for(let i = 0; i < recs.length; i++) {
    const rec = recs[i];

    // Logger.debug(rec.body);
    const o: any = JSON.parse(rec.body);

    const eventDetail = o.detail;
    const eventData = eventDetail.dynamodb;

    Logger.debug(`Received event: `, eventData);


    svc.upsertOrder(o);
  }
  Logger.info('Exiting handler');
};



const data = {detail: { dynamodb: {
  "eventID": "3cf3ae13a8c0a97db18540f7b2aac2c2",
  "eventName": "INSERT",
  "eventVersion": "1.1",
  "eventSource": "aws:dynamodb",
  "awsRegion": "ap-southeast-2",
  "dynamodb": {
    "ApproximateCreationDateTime": 1739672519,
    "Keys": {
      "CustomerId": {
        "S": "f7bb5648-a72b-4b48-a04b-8edb5ea05ec1"
      },
      "OrderId": {
        "S": "88FE34567"
      }
    },
    "NewImage": {
      "AmountCharged": {
        "N": "479.13"
      },
      "Status": {
        "S": "INITIAL"
      },
      "TaxTotal": {
        "N": "0"
      },
      "CreatedTime": {
        "S": "2025-02-16T02:21:58.695Z"
      },
      "OrderItems": {
        "L": [
          {
            "M": {
              "ProductName": {
                "S": "Samsung Galaxy A35 5G"
              },
              "Price": {
                "S": "551"
              },
              "Quantity": {
                "N": "1"
              },
              "ProductId": {
                "S": "198ed412-5b16-5404-b9d3-1474658c760b"
              }
            }
          }
        ]
      },
      "LastUpdatedTime": {
        "S": "2025-02-16T02:21:58.695Z"
      },
      "ReceiptEmail": {
        "S": "brycepc@hotmail.com"
      },
      "CustomerId": {
        "S": "f7bb5648-a72b-4b48-a04b-8edb5ea05ec1"
      },
      "OrderId": {
        "S": "88FE34567"
      },
      "StripePaymentIntent": {
        "M": {
          "Id": {
            "S": "pi_3QsxUZFPlXRs14xe0V4vjfCq"
          }
        }
      },
      "NetTotal": {
        "N": "0"
      },
      "GrossTotal": {
        "N": "0"
      },
      "TaxRate": {
        "N": "0.15"
      }
    },
    "SequenceNumber": "211018700000000015559886495",
    "SizeBytes": 465,
    "StreamViewType": "NEW_AND_OLD_IMAGES"
  },
  "eventSourceARN": "arn:aws:dynamodb:ap-southeast-2:11111111111111:table/tbs-app-order-prod-OrderTable/stream/2025-02-15T05:27:36.398"
}}}

process.env.REPORTS_DB_SECRET_ARN='arn:aws:secretsmanager:ap-southeast-2:048116471576:secret:rds!cluster-f758d888-09b3-4bc1-b0b0-e408ac824554-ElvlWP';
process.env.REPORTS_DB_HOSTNAME='localhost';
process.env.REPORTS_DB_NAME='reports'
process.env.REPORTS_DB_COMNNECTION_LIMIT='200';

const sqsRecord: SQSRecord = {
  awsRegion: "", eventSource: "", eventSourceARN: "", md5OfBody: "",
  messageId: '123',
  receiptHandle: 'test',
  body: JSON.stringify(data),
  attributes: {ApproximateReceiveCount: "1", SentTimestamp: new Date().toISOString(),
    SenderId: 'sender', ApproximateFirstReceiveTimestamp: new Date().toISOString() },
  messageAttributes: {}
}
const event: SQSEvent = {Records: [sqsRecord]};
(async () => {await handler(event)})();