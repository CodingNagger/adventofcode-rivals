import { ScheduledEvent } from "aws-lambda";
import RivalryConfigService from "./services/leaderboards-config";
import AdventOfCodeService from "./services/advent-of-code";
import ScoreComputerService from "./services/score-computer";
import StatsStorageService from "./services/stats-storage";

export async function handler(event: ScheduledEvent): Promise<any> {
	try {
		let year = new Date().getFullYear();
		var config = await new RivalryConfigService("adventofcode-rivals-dev").get(year);
		var rivals = await new ScoreComputerService(new AdventOfCodeService(year)).computeAllRivalsScores(config.rivals);

		const stats = { year, rivals };

		await new StatsStorageService("adventofcode-rivals-dev").save(stats);

		return {
			statusCode: 200,
		}
	}
	catch (e) {
		console.error(e);
	}
}