import { test } from "@playwright/test";
import data from "../data/booking.json";
import { Get } from "../requests/1-get";
import { Post } from "../requests/2-post";
import { Put } from "../requests/3-put";
import { Patch } from "../requests/4-patch";
import { Delete } from "../requests/5-delete";
import { Token } from "../requests/6-createToken";

let bookingIdFromPostRequest: string;
let authTokenCreated: string;
for (let i = 0; i < data.length; i++) {
  test.describe(data[i].suiteName, async () => {
    let getRequest: Get,
      postRequest: Post,
      putRequest: Put,
      patchRequest: Patch,
      deleteRequest: Delete,
      createToken: Token;
    test.beforeEach(async ({ request }) => {
      getRequest = new Get(request);
      postRequest = new Post(request);
      putRequest = new Put(request);
      patchRequest = new Patch(request);
      deleteRequest = new Delete(request);
      createToken = new Token(request);
    });
    test(data[i].testCase, async () => {
      if (data[i].httpMethod == "GetAllIds") {
        await getRequest.getAllMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType
        );
      } else if (data[i].httpMethod === "GetByNames") {
        await getRequest.getByNamesMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType
        );
      } else if (data[i].httpMethod === "GetByDates") {
        await getRequest.getByDatesMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType
        );
      } else if (data[i].httpMethod === "GetById") {
        await getRequest.getByIdMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType,
          bookingIdFromPostRequest
        );
      } else if (data[i].httpMethod === "Post") {
        bookingIdFromPostRequest = await postRequest.postMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType
        );
      } else if (data[i].httpMethod === "Put") {
        await putRequest.putMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType,
          authTokenCreated,
          bookingIdFromPostRequest
        );
      } else if (data[i].httpMethod === "Patch") {
        await patchRequest.patchMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType,
          authTokenCreated,
          bookingIdFromPostRequest
        );
      } else if (data[i].httpMethod === "Delete") {
        await deleteRequest.deleteMethod(
          data[i].endpoint,
          data[i].statusCode,
          bookingIdFromPostRequest,
          authTokenCreated
        );
      } else if (data[i].httpMethod === "validateDelete") {
        await deleteRequest.validateDeleteMethod(
          data[i].endpoint,
          data[i].statusCode,
          bookingIdFromPostRequest
        );
      } else if (data[i].httpMethod === "Auth") {
        authTokenCreated = await createToken.token(
          data[i].endpoint,
          // data[i].authUsername,
          // data[i].authPassword,
          process.env.username,
          process.env.password,
          data[i].statusCode,
          data[i].contentType
        );
      } else {
        console.log("Please enter valid HTTP Request");
      }
    });
  });
}
