import { RivalStats, LeaderboardConfig, AocPrivateLeaderboard } from '../contracts'
import AdventOfCodeService from './advent-of-code'

export default class ScoreComputerService {
    adventOfCode: AdventOfCodeService

    constructor(adventOfCode: AdventOfCodeService) {
        this.adventOfCode = adventOfCode;
    }

    async computeAllRivalsScores(rivalConfigs: LeaderboardConfig[]): Promise<RivalStats[]> {
        return await Promise.all(rivalConfigs.map(c => this.computeRivalScores(c)));
    }

    async computeRivalScores(leaderboardConfig: LeaderboardConfig): Promise<RivalStats> {
        let rivalLeaderboard = await this.adventOfCode.getLeaderboardAsync(leaderboardConfig);
        let stars = this.computeStars(rivalLeaderboard);
        let membersCount = this.countMembers(rivalLeaderboard);
        let starsPerMember = parseFloat((stars / membersCount).toFixed(2));
        
        return {
            name: leaderboardConfig.name,
            stars,
            membersCount,
            starsPerMember,
        }
    }

    countMembers(rivalLeaderboard: AocPrivateLeaderboard): number {
        return Object.keys(rivalLeaderboard.members).length - 1;
    }

    computeStars(rivalLeaderboard: AocPrivateLeaderboard): number {
        var stars = 0;
        for (const iterator in rivalLeaderboard.members) {
            stars += rivalLeaderboard.members[iterator].stars;
        }
        return stars;
    }
}