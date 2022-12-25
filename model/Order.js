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
    borrowDate: { 
      type: String, 
      default: () => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        return today.toLocaleDateString();
      }
    },
    returnDate: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", orderSchema);
