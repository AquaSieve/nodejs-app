import CameraFeedDataModel from "../models/CameraFeedDataModel";

const create = async (data) => {
  return CameraFeedDataModel.create(data);
};

const getGroupData = async () => {
  return CameraFeedDataModel.aggregate([
    {
      $group: {
        _id: "category",
        actual_result: { $first: "$actual_result" },
        probability: { $first: "$probability" },
        date: { $first: "$date" },
      },
    },
  ]);
};

const CameraFeedDataRepository = {
  create,
  getGroupData
};

export { CameraFeedDataRepository };
