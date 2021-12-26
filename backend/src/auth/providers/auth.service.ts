import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddStudentDto } from 'src/shared/dto/add-student.dto';
import { StudentEntity } from 'src/shared/entities/student.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LoginStudentDto } from 'src/shared/dto/login-student.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(StudentEntity)
    private readonly studentRepo: Repository<StudentEntity>,
  ) {}

  async signupStudent(student: AddStudentDto) {
    try {
      // Hash-ujemo sifru
      student.password = await bcrypt.hash(
        student.password,
        this.configService.get('hash.salt'),
      );

      // Narpravimo student entity
      const newStudent = this.studentRepo.create({ ...student, _id: 0 });

      // Provera da li vec postoje studenti sa istim username ili email
      const similarStudents = await this.getAllStudentsByEmailOrUsernameOrPhone(
        student.email,
        student.username,
        student.phoneNumber,
      );

      if (similarStudents[0]) {
        if (student.email == similarStudents[0].email) {
          // Ako postoje studenti sa istim email
          // Vracamo gresku 409 Confict
          throw new HttpException('Email already exists', 409);
        }
        if (student.username == similarStudents[0].username) {
          // Ako postoje studenti sa istim username
          // Vracamo gresku 409 Confict
          throw new HttpException('Username already exists', 409);
        }
        if (student.phoneNumber == similarStudents[0].phoneNumber) {
          // Ako postoje studenti sa istim phoneNumber
          // Vracamo gresku 409 Confict
          throw new HttpException('Phone number already exists', 409);
        }
      }

      // Sacuvamo studenta i vratimo ga
      const savedStudent = await this.studentRepo.save(newStudent);
      // Ako nekim slucajem nije sacuvan student vracamo gresku
      // 500 Server error
      if (!savedStudent) {
        throw new HttpException('Student not saved', 500);
      } else {
        return savedStudent;
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async loginStudent(loginStudentData: LoginStudentDto) {
    try {
      // Trazimo studenta sa istim username
      let student = await this.studentRepo.findOne({
        username: loginStudentData.username,
      });
      // Ako student ne postoji vracamo 404 not found
      if (!student) {
        throw new HttpException('No student found', 404);
      }
      // Da li se sifre poklapaju
      const isPasswordMatch = await bcrypt.compare(
        loginStudentData.password,
        student.password,
      );
      // Ako se na poklapaju sifre vracamo 403 unauthorized
      if (!isPasswordMatch) {
        throw new HttpException('Invalid password', 403);
      }

      const payload = {
        _id: student._id,
        username: student.username,
        type: 'student',
        sub: student._id,
      };
      // Vracamo accessToken i expiresAt(broj milisekundi)
      return {
        accessToken: this.jwtService.sign(payload),
        expiresAt: new Date().getTime() + 3600 * 1000 * 24,
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async getAllStudentsByEmailOrUsernameOrPhone(
    email?: string,
    username?: string,
    phoneNumber?: string,
  ) {
    const filterArray: { [key: string]: string }[] = [];
    if (email) {
      filterArray.push({ email });
    }
    if (username) {
      filterArray.push({ username });
    }
    if (phoneNumber) {
      filterArray.push({ phoneNumber });
    }
    // Pretraga studenata po email ili username
    return this.studentRepo.find({
      where: filterArray,
    });
  }
}
