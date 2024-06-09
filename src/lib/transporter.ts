import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST || "localhost"
const smtpSecure: boolean = process.env.SMTP_SECURE ? Boolean(process.env.SMTP_SECURE) : false;
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : (smtpSecure ? 465 : 1025);

export const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
        user: process.env.SMTP_USER || "user",
        pass: process.env.SMTP_PASSWORD || "password",
    }
});