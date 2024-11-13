import mongoose from "mongoose";
import { Category } from "./category.ts";
import { Position } from "./position.ts";

interface homepageCMSAttrs {
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  user: {
    id: string;
    name: string;
    imageUrl: string;
  };
  position: Position;
  slug: string;
}

/* interface HomepageModel extends mongoose.Model<HomepageDoc> {
  build(attrs: HomepageAttrs): HomepageDoc;
}

export interface HomepageDoc extends mongoose.Document {
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  user: {
    id: string;
    name: string;
    imageUrl: string;
  };
  position: Position;
  slug: string;
} */

const cmsHomePageSchema = new mongoose.Schema(
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
      type: Category,
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
      type: Position,
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
      /* transform(doc: any, ret: { id: any; _id: any; __v: any }) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }, */
    },
  }
);

cmsHomePageSchema.statics.build = (attrs: homepageCMSAttrs) => {
  return new cmsHomePage(attrs);
};

const cmsHomePage = mongoose.model("Homepage", cmsHomePageSchema);

module.exports = { cmsHomePageSchema, cmsHomePage };
