import { YearStats, RivalStats } from "src/contracts";

export default class TextStatsPresenter {
    stats: YearStats;

    constructor(stats: YearStats) {
        this.stats = stats;
    }

    presentation(): string {
        var result = "";
        var rank = 1;
        let sortedRivals = this.getSortedRivals();
        for (var rival of sortedRivals) {
            result += `${rank}. ${rival.name} - ${rival.stars} stars - ${rival.starsPerMember} stars average - ${rival.membersCount} participants\n`;
            rank++;
        }
        return result;
    }

    getSortedRivals(): RivalStats[] {
        return this.stats.rivals.sort((a, b) => b.stars === a.stars ? b.starsPerMember - a.starsPerMember : b.stars - a.stars);
    }
}