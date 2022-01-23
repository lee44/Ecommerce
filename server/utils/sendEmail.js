import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = (options) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const msg = {
		to: options.to,
		from: process.env.EMAIL_FROM,
		subject: options.subject,
		text: options.text,
		html: options.text,
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log("Email sent");
		})
		.catch((error) => {
			console.error(error);
		});
};
