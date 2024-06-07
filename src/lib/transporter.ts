import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "127.0.0.1",
    port: 1025,
    secure: false, // Use `true` for port 465, `false` for all other ports
});