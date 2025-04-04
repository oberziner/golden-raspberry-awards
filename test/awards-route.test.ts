import supertest from "supertest";
import { buildApp } from "../src/server/start";

describe("GET /awards", function () {

  it("returns longest and shortest award intervals", async function() {
    const app = await buildApp();
    await supertest(app)
      .get("/awards")
      .set("Accept", "application/json")
      .send()
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          min: [
            {
              producer_name: 'Joel Silver',
              interval: 1,
              followingWin: 1991,
              previousWin: 1990
            },
            {
              producer_name: 'Matthew Vaughn',
              interval: 1,
              followingWin: 2003,
              previousWin: 2002
            }
          ],
          max: [
            {
              producer_name: 'Matthew Vaughn',
              interval: 22,
              followingWin: 2002,
              previousWin: 1980
            },
            {
              producer_name: 'Matthew Vaughn',
              interval: 22,
              followingWin: 2037,
              previousWin: 2015
            }
          ]
        },
      )
  });
});

