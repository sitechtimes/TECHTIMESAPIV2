import mongoose from "mongoose";
import { Category } from "./category.ts";
import { Position } from "./position.ts";

interface homepageArticlesAttrs {
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
  build(attrs: homepageArticlesAttrs): HomepageDoc;
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
  position: typeof Position;
  slug: string;
} */

const articlesHomePageSchema = new mongoose.Schema(
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

articlesHomePageSchema.statics.build = (attrs: homepageArticlesAttrs) => {
  return new articlesHomePage(attrs);
};

const articlesHomePage = mongoose.model("Homepage", articlesHomePageSchema);

export default { articlesHomePageSchema, articlesHomePage };
