"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draft = exports.draftSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const draftStatus_1 = require("./draftStatus");
const category_1 = require("./category");
const draftSchema = new mongoose_1.default.Schema({
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
    status: {
        type: draftStatus_1.DraftStatus,
        required: true,
        default: draftStatus_1.DraftStatus.Draft,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: category_1.Category,
        default: category_1.Category.Technology,
        required: true,
    },
    userId: {
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
        },
    },
});
exports.draftSchema = draftSchema;
draftSchema.statics.build = (attrs) => {
    return new Draft(attrs);
};
const Draft = mongoose_1.default.model("Draft", draftSchema);
exports.Draft = Draft;
