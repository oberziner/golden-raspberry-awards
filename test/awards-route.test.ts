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
            }
          ],
          max: [
            {
              producer_name: 'Matthew Vaughn',
              interval: 13,
              followingWin: 2015,
              previousWin: 2002
            }
          ]
        },
      )
  });
});

