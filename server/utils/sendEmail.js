import sgMail from "@sendgrid/mail";

export const sendEmail = (options) => {
	sgMail.setApiKey("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");

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
