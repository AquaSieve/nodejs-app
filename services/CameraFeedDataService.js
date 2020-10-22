import { CameraFeedDataRepository } from "../repository/CameraFeedDataRepository";

const processReceivedFeedData = async (data) => {
  const result = await CameraFeedDataRepository.create({
    category: "",
    location: "2.345,2.56",
    actual_result: "sample record",
    probability: 0.91,
  });
  return result;
};

const CameraFeedDataService = {
  processReceivedFeedData,
};

export { CameraFeedDataService };
