import StatsStorageService from "./StatsStorageService";
import { YearStats } from "../contracts";

export default class JsonStatsStorageService extends StatsStorageService {
    getFileExtension(): string {
        return "json";
    }
    
    format(stats: YearStats): string {
        return JSON.stringify(stats);
    }

    parse(body: string): YearStats {
        return JSON.parse(body);
    }
}
