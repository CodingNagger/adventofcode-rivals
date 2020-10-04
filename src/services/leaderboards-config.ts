import { RivalryConfig } from "src/contracts";
import { S3 } from 'aws-sdk';

export default class RivalryConfigService {
    _s3BucketName!: string

    constructor(s3BucketName: string) {
        this._s3BucketName = s3BucketName;
    }

    async get(year: number): Promise<RivalryConfig> {
        var output = await new S3().getObject({
            Bucket: this._s3BucketName,
            Key: `config/${year}.json`
        }).promise()

        return JSON.parse(`${output.Body}`);
    }
}