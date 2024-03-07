# Booker-API
### Overview
This project implements an API tests using Playwright, a Node.js library for API automation. The test suite includes various test cases for CRUD operations on a booking system API. The name of API is "**[restfull-booker](https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-DeleteBooking)**"

### Installation
##### To run the tests, follow these steps:
- Clone this repository to your local machine.
- Install Node.js if you haven't already.
- Install dependencies by running npm install.

### Requirements:
- Playwright
- faker-js
- luxon
- winston
- allure
- nyc

### Folder Structure
- **util**: Contains the `pojo.ts` and `logger.ts` for setting and getting mock booking data.
- **requests**: Includes modules for making HTTP requests (`GET`, `POST`, `DELETE`, `PUT`, `PATCH`) and generating authentication tokens (`AuthToken`).
- **spec**: Houses the test files with test cases for various API CRUD operations.
- **data**: Contains `data.json` file

### Files
- **pojo.ts**: Generates mock booking data using the `faker-js` and `luxon` library.
- **logger.ts**: contains script for logging information and errors in `logs` file.
- **createToken.ts**: Implements the `token` function to obtain authentication tokens.
- **get.ts**, **post.ts**, **delete.ts**, **put.ts**, **patch.ts**: Implement functions for making `GET`, `POST`, `DELETE`, `PUT`, and `PATCH` requests respectively.
- **api.spec.ts**: Contains the main test suite with test cases for CRUD operations on the booking API.
- **data.json**: stores all the data required for running and asserting.

### Reports:
- Allure Report
- HTML Report

### Other Implemantations:
- Code coverage
- Allure
- Logger
- Environment Variable

## Conslusion:
This project demonstrates how to implement an API test using Playwright in TypeScript. It covers various aspects such as generating mock data, making HTTP requests, handling authentication, and validating responses.
