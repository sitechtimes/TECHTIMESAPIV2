"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = exports.articleSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const category_1 = require("./category");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const articleSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: null,
        required: false,
    },
    imageAlt: {
        type: String,
        default: null,
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: category_1.Category,
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
    slug: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.slug_history;
        },
    },
});
exports.articleSchema = articleSchema;
articleSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });
articleSchema.statics.build = (attrs) => {
    return new Article(attrs);
};
const Article = mongoose_1.default.model("Article", articleSchema);
exports.Article = Article;
