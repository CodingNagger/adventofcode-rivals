import { AocPrivateLeaderboard, LeaderboardConfig } from "src/contracts";
import https from "https";
import url from 'url';
export default class AdventOfCodeService {
    year: number;
    constructor(year: number) {
        this.year = year;
    }
    async getLeaderboardAsync(config: LeaderboardConfig): Promise<AocPrivateLeaderboard> {
        if (!config.id) {
            return {
                event: `${this.year}`,
                members: {},
                owner_id: '',
            };
        }
        var result = await this.getFromUrlAndHeadersAsync<AocPrivateLeaderboard>(`https://adventofcode.com/${this.year}/leaderboard/private/view/${config.id}.json`, { "Cookie": `session=${config.session_id}` });
        result.name = config.name;
        return result;
    }
    getFromUrlAndHeadersAsync<T>(uri: string, headers: {
        [key: string]: string;
    }): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { host, path } = url.parse(uri);
            https.get({ host, headers, path }, function (res) {
                var body = "";
                res.setEncoding('utf8');
                res.on("data", data => {
                    body += data.toString();
                });
                res.on("end", () => {
                    try {
                        resolve(JSON.parse(body));
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            }).end();
        });
    }
}
