import { APIRequestContext, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import Pojo from "../util/pojo";
import * as logger from "../util/logger";

export class Put {
  private request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async putMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined,
    token: string,
    bookingId: string
  ) {
    try {
      Pojo.setFirstName(faker.person.firstName());
      Pojo.setLastName(faker.person.lastName());
      Pojo.setTotalPrice(faker.string.numeric(4));
      Pojo.setCheckIn(DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd"));
      Pojo.setCheckOut(
        DateTime.now().plus({ days: 10 }).toFormat("yyyy-MM-dd")
      );
      const response = await this.request.put(endpoint + bookingId, {
        data: {
          firstname: Pojo.getFirstName(),
          lastname: Pojo.getLastName(),
          totalprice: Pojo.getTotalPrice(),
          depositpaid: true,
          bookingdates: {
            checkin: Pojo.getCheckIn(),
            checkout: Pojo.getCheckOut(),
          },
          additionalneeds: "Breakfast",
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
      expect(await responseBody).toHaveProperty("lastname", Pojo.getLastName());
      expect(await responseBody).toHaveProperty(
        "totalprice",
        +Pojo.getTotalPrice()
      );
      expect(await responseBody.bookingdates).toHaveProperty(
        "checkin",
        Pojo.getCheckIn()
      );
      expect(await responseBody.bookingdates).toHaveProperty(
        "checkout",
        Pojo.getCheckOut()
      );
      logger.Logger.info(
        `Updated Existing Booking with booking id ${bookingId}`
      );
    } catch (error) {
      logger.Logger.error(`Error in Updating Existing Booking ${error}`);
    }
  }
}
