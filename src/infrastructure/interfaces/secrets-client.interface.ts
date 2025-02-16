export interface ISecretsClient {
  getSecretValue(secretId: string): Promise<any>;
}
