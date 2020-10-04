import StatsStorageService from "../../services/stats-storage";

const mockS3GetObject = jest.fn();
jest.mock("aws-sdk", () => {
    return {
        S3: jest.fn(() => ({
            getObject: mockS3GetObject
        }))
    };
});

describe('StatsStorageService', () => {
    beforeEach(() => {
        mockS3GetObject.mockReset();
    });

    test("load - makes the right call to S3", async () => {
        const year = 1271;
        const bucketName = 'bucketname';

        mockS3GetObject.mockImplementation((_) => {
            return {
                promise() {
                    return Promise.resolve({ Body: "{}" })
                }
            };
        });

        new StatsStorageService(bucketName).load(year);

        expect(mockS3GetObject).toHaveBeenCalledWith(expect.objectContaining({
            Bucket: bucketName,
            Key: expect.stringContaining(`${year}`),
        }));
    });
});