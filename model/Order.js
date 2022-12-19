const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    visitor: {
      type: Schema.Types.ObjectId,
      ref: "Visitor",
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
    borrowDate: { type: Date, default: () => Date.now() },
    returnDate: { type: Date, default: () => Date.now() },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", orderSchema);
