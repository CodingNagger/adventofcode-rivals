import { S3 } from "aws-sdk";
import { YearStats } from "../contracts";
export default abstract class StatsStorageService {
    s3BucketName: string;
    constructor(s3BucketName: string) {
        this.s3BucketName = s3BucketName;
    }
    saveAsync(stats: YearStats): Promise<any> {
        return new S3().putObject({
            Bucket: this.s3BucketName,
            Key: this.getStatsKeyForYear(stats.year),
            Body: this.format(stats),
        }).promise();
    }

    async loadRawString(year: number): Promise<string>  {
        var output = await new S3().getObject({
            Bucket: this.s3BucketName,
            Key: this.getStatsKeyForYear(year),
        }).promise();
        return `${output.Body}`;
    }

    async loadAsync(year: number): Promise<YearStats> {
        var body = await this.loadRawString(year);
        return this.parse(body);
    }
    getStatsKeyForYear(year: number): string {
        return `stats/${year}.${this.getFileExtension()}`;
    }

    abstract getFileExtension(): string;

    abstract format(stats: YearStats): string;

    abstract parse(body: string): YearStats;
}
