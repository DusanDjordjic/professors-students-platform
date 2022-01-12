import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { ErrorModel } from 'src/shared/models/error.model';
import { RequestShapeType } from 'src/shared/types/request-shape.type';
import { UserType } from 'src/shared/types/user.type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async getAllUsersByType(type: UserType) {
    try {
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
    } catch (err) {
      console.log(err);
      throw new HttpException('Unhandled error', 500);
    }
  }
  async getUserProfile(username: string, shape: RequestShapeType) {
    try {
      const query = this.userRepo.createQueryBuilder('user');
      if (shape == 'simple') {
        query.select([
          'user.username',
          'user.firstname',
          'user.lastname',
          'user.type',
        ]);
      }
      if (shape == 'full') {
        query
          .select([
            'user.username',
            'user.firstname',
            'user.lastname',
            'user.type',
            'user.about',
            'contactInfo.email',
            'contactInfo.phoneNumber',
            'contactInfo.website',
            'address.city',
            'address.street',
            'address.streetNumber',
          ])
          .leftJoin('user.contactInfo', 'contactInfo')
          .leftJoin('user.address', 'address')
          .leftJoinAndSelect('user.selectedSubject', 'selectedSubject')
          .leftJoinAndSelect(
            'selectedSubject.subjectDetails',
            'subjectDetails',
          );
      }

      const user = await query
        .where('user.username = :username', { username })
        .getOne();

      if (!user) {
        throw new ErrorModel('Ne postoj korisnik', 404);
      }
      console.log(user);

      return user;
    } catch (err) {
      if (err instanceof ErrorModel)
        throw new HttpException(err.text, err.status);
      console.log(err);
      throw new HttpException('Unhandled error', 500);
    }
  }
}
