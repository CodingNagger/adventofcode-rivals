import AdventOfCodeService from "../../services/AdventOfCodeService";
import nock from "nock";

describe("AdventOfCodeService", () => {
    test("getLeaderboardAsync - retrieves and parses leaderboard", async () => {
        const year = 2019, id = 'idid1', localScore = 9000;

        nock("https://adventofcode.com/")
            .get(`/${year}/leaderboard/private/view/${id}.json`)
            .reply(200, `{\"members\":{\"376937\":{\"local_score\":${localScore},\"name\":\"Robert Cox\",\"completion_day_level\":{\"1\":{\"1\":{\"get_star_ts\":\"1543644234\"},\"2\":{\"get_star_ts\":\"1543777023\"}},\"2\":{\"1\":{\"get_star_ts\":\"1543783075\"},\"2\":{\"get_star_ts\":\"1543786092\"}},\"3\":{\"1\":{\"get_star_ts\":\"1543849415\"},\"2\":{\"get_star_ts\":\"1543871941\"}},\"4\":{\"1\":{\"get_star_ts\":\"1543947364\"},\"2\":{\"get_star_ts\":\"1543947565\"}}},\"global_score\":0,\"last_star_ts\":\"1543947565\",\"stars\":8,\"id\":\"376937\"}},\"event\":\"2018\",\"owner_id\":\"375291\"}`);
        
        const leaderboard = await new AdventOfCodeService(year).getLeaderboardAsync({ id, name: "", session_id: "" });

        expect(leaderboard).toHaveProperty("members.376937.local_score", localScore);
    });

    test("getLeaderboardAsync - returns empty members set when the id is falsy", async () => {
        const year = 2019, id = 'idid2', localScore = 9000;

        nock("https://adventofcode.com/")
            .get(`/${year}/leaderboard/private/view/${id}.json`)
            .reply(200, `{\"members\":{\"376937\":{\"local_score\":${localScore},\"name\":\"Robert Cox\",\"completion_day_level\":{\"1\":{\"1\":{\"get_star_ts\":\"1543644234\"},\"2\":{\"get_star_ts\":\"1543777023\"}},\"2\":{\"1\":{\"get_star_ts\":\"1543783075\"},\"2\":{\"get_star_ts\":\"1543786092\"}},\"3\":{\"1\":{\"get_star_ts\":\"1543849415\"},\"2\":{\"get_star_ts\":\"1543871941\"}},\"4\":{\"1\":{\"get_star_ts\":\"1543947364\"},\"2\":{\"get_star_ts\":\"1543947565\"}}},\"global_score\":0,\"last_star_ts\":\"1543947565\",\"stars\":8,\"id\":\"376937\"}},\"event\":\"2018\",\"owner_id\":\"375291\"}`);
        
        const leaderboard = await new AdventOfCodeService(year).getLeaderboardAsync({ id: '', name: "", session_id: "" });

        expect(leaderboard).toHaveProperty("members", {});
    });

    test("getLeaderboardAsync - fails if invalid json is retrieved", async () => {
        const year = 2019, id = 'idid3', localScore = 9000;

        nock("https://adventofcode.com/")
            .get(`/${year}/leaderboard/private/view/${id}.json`)
            .reply(200, `{\"members`);
        
            try {
                await new AdventOfCodeService(year).getLeaderboardAsync({ id, name: "", session_id: "" });
                fail('should have thrown an error');
            }
            catch (error) {}
    });

    test("getLeaderboardAsync - fails if 500 is returned", async () => {
        const year = 2019, id = 'idid3', localScore = 9000;

        nock("https://adventofcode.com/")
            .get(`/${year}/leaderboard/private/view/${id}.json`)
            .reply(500, "");
        
            try {
                await new AdventOfCodeService(year).getLeaderboardAsync({ id, name: "", session_id: "" });
                fail('should have thrown an error');
            }
            catch (error) {}
    });
});