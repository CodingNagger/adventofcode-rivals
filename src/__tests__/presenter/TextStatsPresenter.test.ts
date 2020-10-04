import TextStatsPresenter from "../../presenter/TextStatsPresenter";

describe("TextStatsPresenter", () => {
    test("getSortedRivals - sorting by stars", () => {
        const nameA = "A", nameB = "B", nameC = "C", nameD = "D";
        const yearStats = {
            year: 2018,
            rivals: [
                { "name": nameA, "stars": 0, "membersCount": 1, "starsPerMember": 0, "median": 0  },
                { "name": nameB, "stars": 90, "membersCount": 2, "starsPerMember": 45, "median": 0  },
                { "name": nameC, "stars": 30, "membersCount": 3, "starsPerMember": 10, "median": 0  },
                { "name": nameD, "stars": 60, "membersCount": 4, "starsPerMember": 15, "median": 0  }
            ],
        };

        const sortedRivals = new TextStatsPresenter(yearStats).getSortedRivals();

        expect(sortedRivals[0].name).toBe(nameB);
        expect(sortedRivals[1].name).toBe(nameD);
        expect(sortedRivals[2].name).toBe(nameC);
        expect(sortedRivals[3].name).toBe(nameA);
    });

    test("getSortedRivals - sorting by startsPerMember if equality on stars", () => {
        const nameA = "A", nameB = "B", nameC = "C", nameD = "D";
        const yearStats = {
            year: 2018,
            rivals: [
                { "name": nameA, "stars": 12, "membersCount": 1, "starsPerMember": 12, "median": 0  },
                { "name": nameB, "stars": 12, "membersCount": 3, "starsPerMember": 4, "median": 0  },
                { "name": nameC, "stars": 12, "membersCount": 4, "starsPerMember": 3, "median": 0  },
                { "name": nameD, "stars": 12, "membersCount": 2, "starsPerMember": 6, "median": 0  }
            ],
        };

        const sortedRivals = new TextStatsPresenter(yearStats).getSortedRivals();

        expect(sortedRivals[0].name).toBe(nameA);
        expect(sortedRivals[1].name).toBe(nameD);
        expect(sortedRivals[2].name).toBe(nameB);
        expect(sortedRivals[3].name).toBe(nameC);
    });

    test("presentation - sorting by startsPerMember if equality on stars", () => {
        const nameA = "A", nameB = "B", nameC = "C", nameD = "D";
        const yearStats = {
            year: 2018,
            rivals: [
                { "name": nameA, "stars": 0, "membersCount": 1, "starsPerMember": 0, "median": 0 },
                { "name": nameB, "stars": 90, "membersCount": 2, "starsPerMember": 45, "median": 0 },
                { "name": nameC, "stars": 30, "membersCount": 3, "starsPerMember": 10, "median": 0 },
                { "name": nameD, "stars": 60, "membersCount": 4, "starsPerMember": 15, "median": 0 },
            ],
        };

        const presentation = new TextStatsPresenter(yearStats).presentation();

        expect(presentation).toBe(
            `1. ${nameB} - 90 stars - 45 stars average - 2 participants\n` +
            `2. ${nameD} - 60 stars - 15 stars average - 4 participants\n` +
            `3. ${nameC} - 30 stars - 10 stars average - 3 participants\n` +
            `4. ${nameA} - 0 stars - 0 stars average - 1 participants\n`
        );
    });
});