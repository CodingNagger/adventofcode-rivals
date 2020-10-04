import { APIGatewayEvent } from "aws-lambda";
import StatsStorageService from "./services/JsonStatsStorageService";
import TextStatsPresenter from "./presenter/TextStatsPresenter";

export async function handler(event: APIGatewayEvent): Promise<any> {
	try {
		let year = getYear(event);
        const stats = await new StatsStorageService("adventofcode-rivals-dev").loadAsync(year);
        const rankings = new TextStatsPresenter(stats).presentation();

		return {
			statusCode: 200,
			body: rankings
		}
	}
	catch (e) {
		console.error(e);
	}
}

function getYear(event: APIGatewayEvent): number {
	if (!event || !event.pathParameters) {
		return new Date().getFullYear();
	}

	return new Number(event.pathParameters.year).valueOf();
}