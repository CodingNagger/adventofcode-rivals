import StatsStorageService from "../../services/JsonStatsStorageService";

const mockS3GetObject = jest.fn();
const mockS3PutObject = jest.fn();

jest.mock("aws-sdk", () => ({
    S3: jest.fn(() => ({
        getObject: mockS3GetObject,
        putObject: mockS3PutObject,
    }))
}));

describe("StatsStorageService", () => {
    beforeEach(() => {
        mockS3GetObject.mockReset();
        mockS3PutObject.mockReset();
    });

    test("load - makes the right call to S3", async () => {
        const year = 1271;
        const bucketName = "bucketname";

        mockS3GetObject.mockImplementation((_) => ({
            promise() {
                return Promise.resolve({ Body: "{}" });
            }
        }));

        new StatsStorageService(bucketName).loadAsync(year);

        expect(mockS3GetObject).toHaveBeenCalledWith(expect.objectContaining({
            Bucket: bucketName,
            Key: expect.stringContaining(`${year}`),
        }));
    });

    test("load - retrieves data properly", async () => {
        const year = 1271, rivalName = "Blue", rivalStars = 280, rivalMembersCount = 14, rivalStarsPerMember = 20;

        const bucketName = "bucketname";

        mockS3GetObject.mockImplementation((_) => ({
            promise() {
                return Promise.resolve({ Body: `{"year":${year},"rivals":[{"name":"${rivalName}","stars":${rivalStars},"membersCount":${rivalMembersCount},"starsPerMember":${rivalStarsPerMember}}]}` });
            }
        }));

        let result = await new StatsStorageService(bucketName).loadAsync(year);

        expect(result.year).toBe(year);
        expect(result.rivals[0].name).toBe(rivalName);
        expect(result.rivals[0].stars).toBe(rivalStars);
        expect(result.rivals[0].membersCount).toBe(rivalMembersCount);
        expect(result.rivals[0].starsPerMember).toBe(rivalStarsPerMember);
    });

    test("save - makes the right call to S3", async () => {
        const year = 1271;
        const bucketName = "bucketname";
        const body = { year, rivals: [] };
        const serializedBody = JSON.stringify(body);

        mockS3PutObject.mockImplementation((_) => ({
            promise() {
                return Promise.resolve();
            }
        }));

        await new StatsStorageService(bucketName).saveAsync(body);

        expect(mockS3PutObject).toHaveBeenCalledWith(expect.objectContaining({
            Bucket: bucketName,
            Key: expect.stringContaining(`${year}`),
            Body: serializedBody,
        }));
    });
});