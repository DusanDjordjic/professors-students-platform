import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AddressDto } from 'src/shared/dto/address.dto';
import { ConactInfoDto } from 'src/shared/dto/contact_info.dto';
import { UserDetailsDto } from 'src/shared/dto/user-details.dto';

import { ValidateDto } from '../pipes/validate-dto.pipe';

import { ValidateService } from '../providers/validate.service';

@Controller('api/validate')
export class ValidateController {
  constructor(private validateService: ValidateService) {}
  /**
   * Pipe validira format ceo objekat
   * Kao i da li je email odgovarajuceg tipa
   * email je obavezan, phoneNumber i website nisu
   */
  @Post('/contact-info')
  @HttpCode(200)
  async validateContactInfo(@Body(ValidateDto) contactInfo: ConactInfoDto) {
    return await this.validateService.validateContactInfo(contactInfo);
  }

  @Post('/user-details')
  @HttpCode(200)
  async validateUserDetails(@Body(ValidateDto) userDetails: UserDetailsDto) {
    return await this.validateService.validateUserDetails(userDetails);
  }
  @Post('/address')
  @HttpCode(200)
  async validateAddress(@Body(ValidateDto) addressDto: AddressDto) {
    return await this.validateService.validateAddress(addressDto);
  }
}
