import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { SendEmailParams } from './mail.interface';

@Controller('mail')
export class MailController {
  constructor(private readonly sendgridService: SendgridService) {}

  @Post('send-email')
  async sendEmail(@Body() email: SendEmailParams) {
    try {
      const [sendEmailResult, sendThankYouResult] = await Promise.all([
        this.sendgridService.sendEmail(email),
        this.sendgridService.sendThankYouMail(email),
      ]);

      // Handle results if needed
      return { sendEmailResult, sendThankYouResult };
    } catch (error) {
      // Handle errors here
      throw new HttpException(
        'Error sending email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
