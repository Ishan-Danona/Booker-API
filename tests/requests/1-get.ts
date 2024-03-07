import { APIRequestContext, expect } from "@playwright/test";
import Pojo from "../util/pojo";
import * as logger from "../util/logger";
export class Get {
  private request: any;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAllMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined
  ) {
    try {
      const response = await this.request.get(endpoint);
      expect(response.status()).toBe(statusCode);
      expect(response.headers()["content-type"]).toBe(contentType);
      expect(await response.text()).toContain("bookingid");
      logger.Logger.info(`Get All Ids passed with status code ${statusCode}`);
    } catch (error) {
      logger.Logger.error(`Error in Get All Ids ${error}`);
    }
  }

  async getByNamesMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined
  ) {
    try {
      const response = await this.request.get(endpoint, {
        params: {
          firstname: Pojo.getFirstName(),
          lastname: Pojo.getLastName(),
        },
      });
      expect(await response.status()).toBe(statusCode);
      expect(await response.headers()["content-type"]).toBe(contentType);
      expect(await response.text()).toContain("bookingid");
      logger.Logger.info(`Get By Names passed with status code ${statusCode}`);
    } catch (error) {
      logger.Logger.error(`Error in Get By Names ${error}`);
    }
  }
  async getByDatesMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined
  ) {
    try {
      const response = await this.request.get(endpoint, {
        params: {
          checkin: Pojo.getCheckIn(),
          checkOut: Pojo.getCheckOut(),
        },
      });
      expect(await response.status()).toBe(statusCode);
      expect(await response.headers()["content-type"]).toBe(contentType);
      // expect(await response.text()).toContain("bookingid");
      logger.Logger.info(`Get By Dates passed with status code ${statusCode}`);
    } catch (error) {
      logger.Logger.error(`Error in Get By Dates ${error}`);
    }
  }

  async getByIdMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined,
    bookingId: string
  ) {
    try {
      const response = await this.request.get(endpoint + bookingId);
      expect(await response.status()).toBe(statusCode);
      expect(await response.headers()["content-type"]).toBe(contentType);
      const responseBody = await response.json();
      expect(await responseBody).toHaveProperty(
        "firstname",
        Pojo.getFirstName()
      );
      expect(await responseBody).toHaveProperty("lastname", Pojo.getLastName());
      expect(await responseBody).toHaveProperty(
        "totalprice",
        Number(Pojo.getTotalPrice())
      );
      expect(await responseBody.bookingdates).toHaveProperty(
        "checkin",
        Pojo.getCheckIn()
      );
      expect(await responseBody.bookingdates).toHaveProperty(
        "checkout",
        Pojo.getCheckOut()
      );
      logger.Logger.info(`Get By Id passed using booking id ${bookingId}`);
    } catch (error) {
      logger.Logger.error(`Error in Get By Id ${error}`);
    }
  }
}
