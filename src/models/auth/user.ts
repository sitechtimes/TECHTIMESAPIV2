import mongoose from "mongoose";
// import { Password } from "../services/password";
import { Role } from "./role";

interface UserAttrs {
  name: string;
  email: string;
  password: string;
  verificationCode: string;
}

interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  verificationCode: string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: Role.Writer,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    verificationCode: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret.verificationCode;
      },
    },
  }
);

userSchema.pre("save", async (done) => {
  // TODO: uh. change the password or something?
  //   if (this.isModified("password")) {
  //     const hashed = await Password.toHash(this.get("password"));
  //     this.set("password", hashed);
  //   }

  done();
});

const User = mongoose.model<UserDoc>("User", userSchema);

export { User };
