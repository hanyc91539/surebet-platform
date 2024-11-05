import mongoose from "mongoose";

const { Schema } = mongoose;

const historySchema = new Schema(
  {
    userid: {
      type: String,
      required: false,
    },
    bookmaker: {
      type: String,
      required: false,
    },
    sports: {
      type: String,
      required: false,
    },
    league: {
      type: String,
      required: false,
    },
    event: {
      type: String,
      required: false,
    },
    period: {
      type: String,
      required: false,
    },
    market: {
      type: String,
      required: false,
    },
    line: {
      type: String,
      required: false,
    },
    odds: {
      type: Number,
      required: false,
    },
    amount: {
      type: Number,
      required: false,
    },
    percent: {
      type: Number,
      required: false,
    },
    profit: {
      type: Number,
      required: false,
    },
  },
  { timestamps: false }
);

export default mongoose.models.History || mongoose.model("History", historySchema);
