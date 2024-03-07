import { APIRequestContext, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import Pojo from "../util/pojo";
import * as logger from "../util/logger";

export class Patch {
  private request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async patchMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined,
    token: string,
    bookingId: string
  ) {
    try {
      Pojo.setFirstName(faker.person.firstName());
      Pojo.setTotalPrice(faker.string.numeric(4));
      const response = await this.request.patch(endpoint + bookingId, {
        data: {
          firstname: Pojo.getFirstName(),
          totalprice: Pojo.getTotalPrice(),
        },
        headers: {
          Accept: `application/json`,
          Cookie: `token=${token}`,
        },
      });
      expect(response.status()).toBe(statusCode);
      expect(response.headers()["content-type"]).toBe(contentType);
      const responseBody = await response.json();
      expect(await responseBody).toHaveProperty(
        "firstname",
        Pojo.getFirstName()
      );
      expect(await responseBody).toHaveProperty(
        "totalprice",
        +Pojo.getTotalPrice()
      );
      logger.Logger.info(
        `Partially Updated Existing Booking with booking id ${bookingId}`
      );
    } catch (error) {
      logger.Logger.error(
        `Error in Partially Updating Existing Booking ${error}`
      );
    }
  }
}
