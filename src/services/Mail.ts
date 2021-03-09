import nodemailer, { Transporter } from 'nodemailer';
import { resolve } from 'path';
import handlebars from 'handlebars';
import fs from 'fs';

class Mail {

  private client: Transporter

  constructor() {

    const transporter = nodemailer.createTransport({
      host: "smtp.umbler.com",
      port: 587,
      auth: {
        user: "suporte@devrossiniwallace.com.br",
        pass: "!BngV()a7Z(3]"
      }
    });

    this.client = transporter;
  }

  async execute(to: string, subject: string, variables: object, file: string) {

    const layoutDir = resolve(__dirname, '..', 'resources', 'mail', `${file}.hbs`);

    const templateFileContext = fs.readFileSync(layoutDir).toString('utf-8');

    const mailTemplateParse = handlebars.compile(templateFileContext);

    const html = mailTemplateParse(variables);

    await this.client.sendMail({
      to,
      subject,
      html,
      from: "Suporte <suporte@devrossiniwallace.com.br>"
    })
  }
}

export default new Mail();