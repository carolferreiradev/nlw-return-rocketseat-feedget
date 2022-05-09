import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9006cf253d3ead",
    pass: "926b805b062f09",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: `Equipe Feedget <oi@feedget.com>`,
      to: `Carol Ferreira <developer.anacarolina@gmail.com>`,
      subject,
      html: body,
    });
  }
}
