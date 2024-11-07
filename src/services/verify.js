"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verify = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Verify {
    static generateToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({ email }, process.env.JWT_KEY, {
                expiresIn: "20m",
            });
        });
    }
    static sendVerificationEmail(email, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)({
                host: "smtp.gmail.com",
                service: "gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            }));
            let mailOptions = {
                from: process.env.EMAIL_USER,
                to: email.toString(),
                subject: "TechTimes Email confirmation",
                html: `Hello there, click the following link to verify your email: <a href="${process.env.URL}/auth/verify/${code}">Verify email</a>`,
            };
            return transport.sendMail(mailOptions);
        });
    }
}
exports.Verify = Verify;
