import {inject, injectable} from "inversify";
import {IDbParamsBuilder} from "./dbparams-builder.interface";
import TYPES from "../types";
import {ISecretsClient} from "../interfaces/secrets-client.interface";

@injectable()
export class DbParamsBuilder implements IDbParamsBuilder {
  // private secretsClient = new SecretsManagerClient();
  private secretsClient: ISecretsClient;

  constructor(@inject(TYPES.ISecretsClient) secretsClient: ISecretsClient) {
    this.secretsClient = secretsClient;
  }

  public async getDbUrl(envVars: any) {

    const self = this;
    console.info('Entered SecretsClient.getDbParams(), retrieving secret for:', envVars.REPORTS_DB_SECRET_ARN);

    /*
    const params: GetSecretValueCommandInput = {
      SecretId: envVars.REPORTS_DB_SECRET_ARN
    };
    */

    const response = await self.secretsClient.getSecretValue(envVars.REPORTS_DB_SECRET_ARN);
    // const response = await self.secretsClient.send(new GetSecretValueCommand(params));

    console.debug('Secret is:', response);
    const dbSecret = JSON.parse(response.SecretString || '{}');

    const dbParams = {
      hostname: envVars.REPORTS_DB_HOSTNAME,
      username: dbSecret.username,
      password: dbSecret.password,
      dbName: envVars.REPORTS_DB_NAME
    }

    const url = `postgresql://${dbParams.username}:${dbParams.password}@${dbParams.hostname}:5432/${dbParams.dbName}?schema=public`
    return url;
  }

}