import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { SendEmailParams } from 'src/mail/mail.interface';

@Injectable()
export class SendgridService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }

  async sendEmail(sendEmailParams: SendEmailParams) {
    const mail = {
      to: 'lukabugarin6@gmail.com',
      subject: 'New Message from Website',
      from: 'lukabugarin6@gmail.com',
      text: sendEmailParams.message,
      html: `
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 20px;">
              <h2>New Message from Website</h2>
              <p><strong>Name:</strong> ${sendEmailParams.name}</p>
              <p><strong>Email:</strong> ${sendEmailParams.email}</p>
              <p><strong>Message:</strong> ${sendEmailParams.message}</p>
            </div>
          </div>
        `,
    };

    return await this.send(mail);
  }

  async sendThankYouMail(sendEmailParams: SendEmailParams) {
    const mail = {
      to: sendEmailParams.email,
      subject: 'Thank You for Reaching Out',
      from: 'lukabugarin6@gmail.com',
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 20px;">
          <h2>Thank You for Reaching Out</h2>

          <p>I've received your message, and I appreciate your reaching out to me. I'll get back to you as soon as possible.</p>

          <p>If you have any further questions or requests, feel free to contact me at [your contact information].</p>

          <p>Best regards,<br>
          Luka Bugarin<br>
        </div>
      </div>
      `,
    };

    return await this.send(mail);
  }

  private async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    return transport;
  }
}
