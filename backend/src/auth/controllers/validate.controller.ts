import { Body, Controller, Post } from '@nestjs/common';
import { ConactInfoDto } from 'src/shared/dto/contact_info.dto';

import { ValidateContactInfo } from '../pipes/validate-email-body.pipe';

import { EmailService } from '../providers/email.service';

@Controller('api/validate')
export class ValidateController {
  constructor(private emailService: EmailService) {}
  /**
   * Pipe validira format ceo objekat
   * Kao i da li je email odgovarajuceg tipa
   * email je obavezan, phoneNumber i website nisu
   */
  @Post('/contact-info')
  async validateEmail(@Body(ValidateContactInfo) contactInfo: ConactInfoDto) {
    return await this.emailService.validateEmail(contactInfo);
  }
}
