import nodemailer from "nodemailer";
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "53e03efb559cf3",
    pass: "ed58a18e96513a",
  },
});

export const SendMail = ({ to, subject, text, token }) => {
  transport.sendMail(
    {
      from: "chompa@gmail.com",
      to: to,
      subject: subject,
      text: `${text}, ${token}`,
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    },
  );
};
