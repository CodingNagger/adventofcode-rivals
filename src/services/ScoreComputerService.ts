import { RivalStats, LeaderboardConfig, AocPrivateLeaderboard, AocMember } from '../contracts';
import AdventOfCodeService from "./AdventOfCodeService";
export default class ScoreComputerService {
    adventOfCode: AdventOfCodeService;
    constructor(adventOfCode: AdventOfCodeService) {
        this.adventOfCode = adventOfCode;
    }
    async computeAllRivalsScores(rivalConfigs: LeaderboardConfig[]): Promise<RivalStats[]> {
        return await Promise.all(rivalConfigs.map(c => this.computeRivalScores(c)));
    }
    async computeRivalScores(leaderboardConfig: LeaderboardConfig): Promise<RivalStats> {
        let rivalLeaderboard = await this.adventOfCode.getLeaderboardAsync(leaderboardConfig);
        console.log(`${JSON.stringify(this.adventOfCode)} -> ${JSON.stringify(rivalLeaderboard)}`);
        let stars = this.computeStars(rivalLeaderboard);
        let membersCount = this.countMembers(rivalLeaderboard);
        let starsPerMember = parseFloat((stars / membersCount).toFixed(2));
        let median = this.findMedian(rivalLeaderboard);
        return {
            name: leaderboardConfig.name,
            stars,
            membersCount,
            starsPerMember,
            median,
        };
    }
    findMedian(rivalLeaderboard: AocPrivateLeaderboard) {
        // for (const member of this.getValidMembers(rivalLeaderboard).sort((a, b) => b.stars - a.stars)) {
        //     stars += member.stars;
        // }
        return 1;
    }
    countMembers(rivalLeaderboard: AocPrivateLeaderboard): number {
        return this.getValidMembers(rivalLeaderboard).length;
    }
    computeStars(rivalLeaderboard: AocPrivateLeaderboard): number {
        var stars = 0;
        for (const member of this.getValidMembers(rivalLeaderboard)) {
            stars += member.stars;
        }
        return stars;
    }
    getValidMembers(rivalLeaderboard: AocPrivateLeaderboard): AocMember[] {
        return Object.keys(rivalLeaderboard.members)
            .filter(k => Number(rivalLeaderboard.members[k].stars) > 0)
            .map(k => rivalLeaderboard.members[k]);
    }
}
