import {
  GetSecretValueCommand, GetSecretValueCommandInput,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import {injectable} from 'inversify';
import {ISecretsClient} from "../../interfaces/secrets-client.interface";

@injectable()
/**
 * ParameterStoreClient
 */
export class SecretsClient implements ISecretsClient {
  private secretsClient = new SecretsManagerClient();
  /**
   * getValue
   * @param {string} secretId
   * @returns {Promise<any>}
   */
  async getSecretValue(secretId: string): Promise<any> {
    console.info('Entered SecretsClient.getSecretValue()');

    const params: GetSecretValueCommandInput = {
      SecretId: secretId
    };
    const response = await this.secretsClient.send(new GetSecretValueCommand(params));
    console.debug('Secret is:', response);
    return response;
  }
}
