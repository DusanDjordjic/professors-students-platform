import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConactInfoDto } from 'src/shared/dto/contact_info.dto';
import { User } from 'src/shared/entities/user.entity';
import { ErrorModel } from 'src/shared/models/error.model';
import { Repository } from 'typeorm';

@Injectable()
export class EmailService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  /**
   * Proveriti da li email vec postoji
   */
  async validateEmail(contactInfo: ConactInfoDto) {
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
}
