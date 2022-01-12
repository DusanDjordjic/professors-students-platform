import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressDto } from 'src/shared/dto/address.dto';
import { ConactInfoDto } from 'src/shared/dto/contact_info.dto';
import { UserDetailsDto } from 'src/shared/dto/user-details.dto';
import { User } from 'src/shared/entities/user.entity';
import { ErrorModel } from 'src/shared/models/error.model';
import { Repository } from 'typeorm';

@Injectable()
export class ValidateService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  /**
   * Proveriti da li email vec postoji
   */
  async validateContactInfo(contactInfo: ConactInfoDto) {
    try {
      // Uzimamo sve usere koji imaju email kao sto je trazen
      const sameEmailUsers = await this.userRepo
        .createQueryBuilder('user')
        .select()
        .leftJoinAndSelect('user.contactInfo', 'contactInfo')
        .where('contactInfo.email = :email', { email: contactInfo.email })
        .getMany();

      // Ako postoji barem jedan user vracamo 409 Conflict
      if (sameEmailUsers.length !== 0) {
        throw new ErrorModel('Email već postoji', 409);
      } else {
        return contactInfo;
      }
    } catch (err) {
      if (err instanceof ErrorModel)
        throw new HttpException(err.text, err.status);
      console.log(err);
      throw new HttpException('Greška na serveru', 500);
    }
  }
  async validateUserDetails(userDetails: UserDetailsDto) {
    try {
      // Uzimamo sve usere koji imaju isti username
      const sameUsernameUsers = await this.userRepo
        .createQueryBuilder('user')
        .where('user.username = :username', { username: userDetails.username })
        .getMany();
      // Ako postoji barem jedan user vracamo 409 Conflict
      if (sameUsernameUsers.length !== 0) {
        throw new ErrorModel('Username već postoji', 409);
      } else {
        return userDetails;
      }
    } catch (err) {
      if (err instanceof ErrorModel)
        throw new HttpException(err.text, err.status);
      console.log(err);
      throw new HttpException('Greška na serveru', 500);
    }
  }
  async validateAddress(addressDetails: AddressDto) {
    try {
      return addressDetails;
    } catch (err) {
      if (err instanceof ErrorModel)
        throw new HttpException(err.text, err.status);
      console.log(err);
      throw new HttpException('Greška na serveru', 500);
    }
  }
  async validateAbout(aboutText: string) {
    console.log('c');
    try {
      console.log('d');
      return aboutText;
    } catch (err) {
      if (err instanceof ErrorModel)
        throw new HttpException(err.text, err.status);
      console.log(err);
      throw new HttpException('Greška na serveru', 500);
    }
  }
}
