import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { UserType } from 'src/shared/types/user.type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async getAllUsersByType(type: UserType) {
    return (
      this.userRepo
        .createQueryBuilder('user')
        .select([
          'user.username',
          'user.firstname',
          'user.lastname',
          'contactInfo.email',
          'contactInfo.phoneNumber',
          'contactInfo.website',
        ])
        .leftJoin('user.contactInfo', 'contactInfo')
        .where('user.type = :type', { type: type })
        // .leftJoinAndSelect('user.selectedSubject', 'ss')
        // .leftJoinAndSelect('ss.subjectDetails', 'sd')
        .getMany()
    );
  }
}
