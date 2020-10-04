import { S3 } from "aws-sdk";
import { YearStats } from "../contracts";

export default class StatsStorageService {
    s3BucketName: string;

    constructor(s3BucketName: string) {
        this.s3BucketName = s3BucketName;
    }

    async save(stats: YearStats): Promise<void> {
        await new S3().putObject({
            Bucket: this.s3BucketName,
            Key: this.getStatsKeyForYear(stats.year),
            Body: JSON.stringify(stats),
        }).promise();
    }

    async load(year: number): Promise<YearStats> {
        var output = await new S3().getObject({
            Bucket: this.s3BucketName,
            Key: this.getStatsKeyForYear(year),
        }).promise()

        return JSON.parse(`${output.Body}`);
    }

    getStatsKeyForYear(year: number): string {
        return `stats/${year}.json`;
    }
}