import { APIRequestContext, expect } from "@playwright/test";
import * as logger from "../util/logger";

export class Token {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async token(
    endpoint: string,
    authUserName: string | undefined,
    authPassword: string | undefined,
    statusCode: number,
    contentType: string | undefined
  ) {
    try {
      const response = await this.request.post(endpoint, {
        data: {
          username: authUserName,
          password: authPassword,
        },
      });
      expect(response.status()).toBe(statusCode);
      expect(response.headers()["content-type"]).toBe(contentType);
      expect(await response.text()).toContain("token");
      const responseBody = await response.json();
      const tokenCreated = await responseBody.token;
      logger.Logger.info(
        `Generated Token using username: ${authUserName} and password: ${authPassword}`
      );
      return tokenCreated;
    } catch (error) {
      logger.Logger.error(`Error in Generating Token ${error}`);
    }
  }
}
