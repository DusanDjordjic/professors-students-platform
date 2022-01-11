import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/shared/dto/user.dto';
import { Address } from 'src/shared/entities/address.entity';
import { ContactInfo } from 'src/shared/entities/contact-info.entity';
import { SelectedSubject } from 'src/shared/entities/selected-subject.entity';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorModel } from 'src/shared/models/error.model';
import { SubjectDetails } from 'src/shared/entities/subject-details.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    @InjectRepository(SelectedSubject)
    private readonly selectedSubjectRepo: Repository<SelectedSubject>,
    @InjectRepository(SubjectDetails)
    private readonly selectedDetailsRepo: Repository<SubjectDetails>,
    private readonly configService: ConfigService,
  ) {}
  async signupUser(userDetails: CreateUserDto) {
    try {
      userDetails.password = await bcrypt.hash(
        userDetails.password,
        this.configService.get('hash.salt'),
      );
      const conflictUsers = await this.userRepo
        .createQueryBuilder('user')
        .select()
        .leftJoinAndSelect('user.contactInfo', 'contactInfo')
        .where('user.username = :username', { username: userDetails.username })
        .orWhere('contactInfo.email = :email', {
          email: userDetails.contactInfo.email,
        })
        .getMany();

      if (conflictUsers.length > 0) {
        throw new ErrorModel('Email ili username su vec zauzeti', 409);
      }
      const newUser = this.userRepo.create({
        ...userDetails,
        id: 0,
      });
      const savedUser = await this.userRepo.save(newUser);
      let subjectToSave = (
        await this.selectedDetailsRepo
          .createQueryBuilder('subject')
          .select()
          .getMany()
      ).filter((subject) => userDetails.subjects.includes(subject.id));

      for (let i = 0; i < subjectToSave.length; i++) {
        const selectedSubjectRow = this.selectedSubjectRepo.create({
          id: 0,
          user: savedUser,
          subjectDetails: subjectToSave[i],
        });

        this.selectedSubjectRepo.save(selectedSubjectRow);
      }
      return savedUser;
    } catch (err) {
      if (err instanceof ErrorModel)
        throw new HttpException(err.text, err.status);
      console.log(err);
      throw new HttpException('Greška na serveru', 500);
    }
  }
}
