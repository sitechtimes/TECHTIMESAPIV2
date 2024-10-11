import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema(
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
      /* type: Category, */
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
      /* type: Position, */
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

homepageSchema.statics.build = (attrs) => {
  return new Homepage(attrs);
};

mongoose.deleteModel("Homepage");
const Homepage = mongoose.model("Homepage", homepageSchema);

export { homepageSchema, Homepage };
