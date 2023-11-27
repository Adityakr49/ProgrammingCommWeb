const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide problem name"],
      maxlength: 50,
      minlength: 3,
    },
    link: {
      type: String,
      required: [true, "Please provide link"],
    },
    difficulty: {
      type: String,
      required: [true, "Please provide difficulty"],
      enum: ["Easy", "Medium", "Hard"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Pod", problemSchema);
