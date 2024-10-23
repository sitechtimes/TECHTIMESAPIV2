const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: null,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: false,
      },
    },
    position: {
      type: Object,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
/* userSchema.statics.build = (attrs) => {
  return new Homepage(attrs);
}; */

/* mongoose.deleteModel("Homepage"); */

module.exports = mongoose.model("user", userSchema);
