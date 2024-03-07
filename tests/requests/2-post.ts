import { APIRequestContext, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import Pojo from "../util/pojo";
import * as logger from "../util/logger";

export class Post {
  private request: any;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async postMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined
  ) {
    try {
      Pojo.setFirstName(faker.person.firstName());
      Pojo.setLastName(faker.person.lastName());
      Pojo.setTotalPrice(faker.string.numeric(4));
      Pojo.setCheckIn(DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd"));
      Pojo.setCheckOut(
        DateTime.now().plus({ days: 10 }).toFormat("yyyy-MM-dd")
      );

      const response = await this.request.post(endpoint, {
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
      });
      expect(await response.status()).toBe(statusCode);
      expect(await response.headers()["content-type"]).toBe(contentType);
      const responseBody = await response.json();
      const bookingId = await responseBody.bookingid;
      expect(await responseBody.booking).toHaveProperty(
        "firstname",
        Pojo.getFirstName()
      );
      expect(await responseBody.booking).toHaveProperty(
        "lastname",
        Pojo.getLastName()
      );
      expect(await responseBody.booking).toHaveProperty(
        "totalprice",
        Number(Pojo.getTotalPrice())
      );
      expect(await responseBody.booking.bookingdates).toHaveProperty(
        "checkin",
        Pojo.getCheckIn()
      );
      expect(await responseBody.booking.bookingdates).toHaveProperty(
        "checkout",
        Pojo.getCheckOut()
      );
      logger.Logger.info(`New Booking Created having booking id ${bookingId}`);
      return bookingId;
    } catch (error) {
      logger.Logger.error(`Error in Creating New Booking ${error}`);
    }
  }
}
