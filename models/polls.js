const mongoose = require("../config/poll");
const Autoincrement = require("mongoose-sequence")(mongoose);

const pollsSchema = mongoose.Schema(
  {
    question: String,
    timelimit: Date,
    option: [
      {
        id: Number,
        voters: [
          {
            type: Schema.Types.ObjectId,
            ref: "User"
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
);

pollsSchema.plugin(Autoincrement, {
  id: "poll_counter",
  inc_field: "id"
});

const Polls = mongoose.model("Polls", pollsSchema);

module.exports = Polls;
