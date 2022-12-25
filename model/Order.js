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
      type: Date, 
      default: () => {
        return Date.now();
      }
    },
    returnDate: {
      type: String,
      default: `<img src="/images/return.png" data-bs-toggle="modal" data-bs-target="#returnCardModal">`
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", orderSchema);
