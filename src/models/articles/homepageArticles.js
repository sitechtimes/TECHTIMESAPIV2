"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articlesHomePage = exports.articlesHomePageSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const category_ts_1 = require("./category.ts");
const position_ts_1 = require("./position.ts");
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
const articlesHomePageSchema = new mongoose_1.default.Schema({
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
        type: category_ts_1.Category,
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
        type: position_ts_1.Position,
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
exports.articlesHomePageSchema = articlesHomePageSchema;
articlesHomePageSchema.statics.build = (attrs) => {
    return new articlesHomePage(attrs);
};
const articlesHomePage = mongoose_1.default.model("Homepage", articlesHomePageSchema);
exports.articlesHomePage = articlesHomePage;
