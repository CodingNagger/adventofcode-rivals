import ScoreComputerService from "../../services/ScoreComputerService";

describe("ScoreComputerService", () => {
    test("computeRivalScores - works", async () => {
        const name = "plop";
        const config = [{ id: "coucou", name, session_id: "sessionid" }];


        const MockAdventOfCodeService = jest.fn(() => ({
            year: 1991,
            getLeaderboardAsync: () => Promise.resolve({
                event: "",
                members: {
                    "0001": {
                        stars: 10,
                        global_score: 0,
                        local_score: 0,
                        last_star_ts: "",
                        id: "",
                        name: "",
                    },
                    "0002": {
                        stars: 10,
                        global_score: 0,
                        local_score: 0,
                        last_star_ts: "",
                        id: "",
                        name: "",
                    },
                    "0003": {
                        stars: 70,
                        global_score: 0,
                        local_score: 0,
                        last_star_ts: "",
                        id: "",
                        name: "",
                    }
                },
                owner_id: "",

            }),
            getFromUrlAndHeadersAsync: jest.fn(),
        }));


        var rivals = await new ScoreComputerService(new MockAdventOfCodeService()).computeAllRivalsScores(config);

        expect(rivals[0].membersCount).toBe(3);
        expect(rivals[0].stars).toBe(90);
        expect(rivals[0].starsPerMember).toBe(30);
        expect(rivals[0].name).toBe(name);
    });

    test("computeRivalScores - doesn't include members with points", async () => {
        const name = "plop";
        const config = [{ id: "coucou", name, session_id: "sessionid" }];


        const MockAdventOfCodeService = jest.fn(() => ({
            year: 1991,
            getLeaderboardAsync: () => Promise.resolve({
                event: "",
                members: {
                    "0001": {
                        stars: 10,
                        global_score: 0,
                        local_score: 0,
                        last_star_ts: "",
                        id: "",
                        name: "",
                    },
                    "0002": {
                        stars: 0,
                        global_score: 0,
                        local_score: 0,
                        last_star_ts: "",
                        id: "",
                        name: "",
                    },
                    "0003": {
                        stars: 70,
                        global_score: 0,
                        local_score: 0,
                        last_star_ts: "",
                        id: "",
                        name: "",
                    }
                },
                owner_id: "",

            }),
            getFromUrlAndHeadersAsync: jest.fn(),
        }));


        var rivals = await new ScoreComputerService(new MockAdventOfCodeService()).computeAllRivalsScores(config);

        expect(rivals[0].membersCount).toBe(2);
        expect(rivals[0].stars).toBe(80);
        expect(rivals[0].starsPerMember).toBe(40);
        expect(rivals[0].name).toBe(name);
    });
});