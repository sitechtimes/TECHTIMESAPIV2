"use strict";
const mongoose0 = require("mongoose");
const { Category0 } = require("./category.ts");
const { Position0 } = require("./position.ts");
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
const cmsHomePageSchema = new mongoose0.Schema({
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
        type: Category0,
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
        type: Position0,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
    /* transform(doc: any, ret: { id: any; _id: any; __v: any }) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }, */
    },
});
cmsHomePageSchema.statics.build = (attrs) => {
    return new cmsHomePage(attrs);
};
const cmsHomePage = mongoose0.model("Homepage", cmsHomePageSchema);
module.exports = { cmsHomePageSchema, cmsHomePage };
