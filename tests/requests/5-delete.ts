import { APIRequestContext, expect } from "@playwright/test";
import * as logger from "../util/logger";

export class Delete {
  private request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async deleteMethod(
    endpoint: string,
    statusCode: number,
    bookingId: string,
    token: string
  ) {
    try {
      const response = await this.request.delete(endpoint + bookingId, {
        headers: {
          Accept: `application/json`,
          Cookie: `token=${token}`,
        },
      });
      expect(response.status()).toBe(statusCode);
      logger.Logger.info(
        `Existing Booking Deleted having booking id ${bookingId}`
      );
    } catch (error) {
      logger.Logger.error(`Error in Deleting Existing Booking ${error}`);
    }
  }

  async validateDeleteMethod(
    endpoint: string,
    statusCode: number,
    bookingId: string
  ) {
    try {
      const response = await this.request.get(endpoint + bookingId);
      expect(response.status()).toBe(statusCode);
      logger.Logger.info(
        `Validated Deleted Booking with booking id ${bookingId}`
      );
    } catch (error) {
      logger.Logger.error(`Error in Validating Deleted Booking ${error}`);
    }
  }
}
