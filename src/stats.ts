import { APIGatewayEvent } from "aws-lambda";
import StatsStorageService from "./services/stats-storage";

export async function handler(event: APIGatewayEvent): Promise<any> {
	try {
		let year = getYear(event);
		const stats = await new StatsStorageService("adventofcode-rivals-dev").load(year);

		return {
			statusCode: 200,
			body: `${JSON.stringify(stats.rivals)}`
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