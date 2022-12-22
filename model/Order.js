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
      returned: {
        type: Boolean,
        default: false
      },
      time: Date
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", orderSchema);
