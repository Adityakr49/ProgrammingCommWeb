const mongoose = require("mongoose");

const ContestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
      minlength: 3,
    },
    contestNo: {
      type: Number,
      required: [true, "Please provide Contest no"],
    },
    type: {
      type: String,
      enum: ["weekly", "monthly","biweekly"],
      default: "weekly",
    },
    link: {
      type: String,
      required: [true, "Please provide link"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    startDate: {
      type: Date,
      required: [true, "Please provide date"],
    },
    noOfMin: {
      type: String,
      required: [true, "Please provide no of Minutes"],
    },
    noOfQ: {
      type: Number,
      required: [true, "Please provide No of Questions"],
    },
    maxMarks: {
      type: Number,
      required: [true, "Please provide max Marks"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Contest", ContestSchema);
