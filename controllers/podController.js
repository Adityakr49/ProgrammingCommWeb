const Pod = require("../models/Pod");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getPod = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pod = await Pod.findOne({
      date: today.toLocaleDateString("en-IN"),
    });
    if (!pod) {
      throw new CustomError.NotFoundError("Pod not found for today");
    }
    res.status(StatusCodes.OK).json({ pod });
  } catch (error) {
    if (error instanceof CustomError.NotFoundError) {
      res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    } else {
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  }
};

const createPod = async (req, res) => {
  try {
    const { name, link, difficulty, date } = req.body;
    const podAlreadyExist = await Pod.findOne({ date });
    if (podAlreadyExist) {
      throw new CustomError.BadRequestError("Pod exist on that day");
    }
    const podData = {
      name,
      link,
      difficulty,
      createdBy: req.user.userId,
      date: date || new Date(),
    };
    const newPod = new Pod(podData);
    await newPod.save();
    res.status(StatusCodes.CREATED).json({ pod: newPod });
  } catch (error) {
    console.error("Error in Pod:", error.message);
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal Server Error",
    });
  }
};

const getPodbyId = async (req, res) => {
  const { id } = req.params;
  const prob = await Pod.findOne({ _id: id });
  if (!prob) {
    throw new CustomError.NotFoundError(`No problem with id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ prob });
};

const updatePod = async (req, res) => {
  const { _id, propToChange, newValue } = req.body;
  if (!_id || !propToChange || !newValue) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const pod = await Pod.findOne({ _id });
  if (!pod) {
    throw new CustomError.NotFoundError(`No pod with id: ${_id}`);
  }
  pod[propToChange] = newValue;
  await pod.save();
  res.status(StatusCodes.OK).json({ pod });
};

const getAllPods = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const pods = await Pod.find({
      createdAt: { $gte: sevenDaysAgo },
    })
      .sort({ createdAt: "desc" })
      .exec();

    res.status(StatusCodes.OK).json({ pods });
  } catch (error) {
    console.error("Error fetching last 7 days pods:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
const deletePod = async (req, res) => {
  try {
    const { date } = req.body;
    const result = await Pod.deleteOne({ date:date });
    if (result.deletedCount == 1) {
      res.status(200).json({ msg: "Successfully deleted" });
    } else {     
      res.status(404).json({ msg: "Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal Server Error",
    });
  }
};
module.exports = {
  getPod,
  createPod,
  getPodbyId,
  updatePod,
  getAllPods,
  deletePod,
};
