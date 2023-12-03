const Contest = require("../models/Contest");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getContest = async (req, res) => {
  const currentDate = new Date();
  const daysInFuture = 7; // You can adjust this value as needed

  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + daysInFuture);

  try {
    const contests = await Contest.find({
      startDate: { $gte: currentDate, $lte: futureDate },
    });

    res.status(200).json({ contests });
  } catch (error) {
    console.error("Error fetching contests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createContest = async (req, res) => {
  try {
    const { name, contestNo, type, link, startDate, noOfMin, noOfQ, maxMarks } =
      req.body;
    const AlreadyExist = await Contest.findOne({ contestNo });
    if (AlreadyExist) {
      throw new CustomError.BadRequestError("Contest Already");
    }
    const contestData = {
      name,
      contestNo,
      type,
      link,
      startDate,
      noOfMin,
      noOfQ,
      maxMarks,
      createdBy: req.user.userId,
    };
    const newCon = new Contest(contestData);
    await newCon.save();
    res.status(StatusCodes.CREATED).json({ con: newCon });
  } catch (error) {
    console.error("Error in Con:", error.message);
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal Server Error",
    });
  }
};

const getContestbyId = async (req, res) => {
  const { id } = req.params;
  const con = await Contest.findOne({ contestNo: id });
  if (!con) {
    throw new CustomError.NotFoundError(`No contest with id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ con });
};

const updateContest = async (req, res) => {
  const { contestNo, propToChange, newValue } = req.body;
  if (!contestNo || !propToChange || !newValue) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const con = await Contest.findOne({ contestNo });
  if (!con) {
    throw new CustomError.NotFoundError(`No contest with id: ${_id}`);
  }
  con[propToChange] = newValue;
  await con.save();
  res.status(StatusCodes.OK).json({ con });
};
const deleteContest = async (req, res) => {
  try {
    const { contestNo } = req.body;
    const result = await Contest.deleteOne({ contestNo });
    if (result.deletedCount == 1) {
      res.status(StatusCodes.OK).json({ msg: "Deleted Successfully" });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Unsuccessful" });
    }
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  getContest,
  createContest,
  getContestbyId,
  updateContest,
  deleteContest,
};
