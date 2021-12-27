import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ProfessorEntity } from 'src/shared/entities/professor.entity';
import { AddProfessorDto } from 'src/shared/dto/add-professor.dto';
import { LoginProfessorDto } from 'src/shared/dto/login-professor.dto';
@Injectable()
export class ProfessorAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(ProfessorEntity)
    private readonly professorRepo: Repository<ProfessorEntity>,
  ) {}

  async signupProfessor(professor: AddProfessorDto) {
    try {
      // Hash-ujemo sifru
      professor.password = await bcrypt.hash(
        professor.password,
        this.configService.get('hash.salt'),
      );

      // Narpravimo profesor entity
      const newProfessor = this.professorRepo.create({ ...professor, _id: 0 });

      // Provera da li vec postoje profesori sa istim username ili email ili phoneNumber
      const similarProfessors =
        await this.getAllProfessorsByEmailOrUsernameOrPhone(
          professor.email,
          professor.username,
          professor.phoneNumber,
        );

      // Todo napraviti da se greske sakupljaju
      let existsErrors: { [key: string]: string }[] = [];
      if (similarProfessors[0]) {
        if (professor.email == similarProfessors[0].email) {
          // Ako postoje profesori sa istim email dodamo gresku u listu gresaka

          existsErrors.push({
            field: 'email',
            message: 'Email already exists',
          });
          throw new HttpException('Email already exists', 409);
        }
        if (professor.username == similarProfessors[0].username) {
          // Ako postoje profesori sa istim username dodamo gresku u listu gresaka

          existsErrors.push({
            field: 'username',
            message: 'Username already exists',
          });
        }
        if (professor.phoneNumber == similarProfessors[0].phoneNumber) {
          // Ako postoje profesori sa istim phoneNumber dodamo gresku u listu gresaka

          existsErrors.push({
            field: 'phoneNumber',
            message: 'Phone number already exists',
          });
        }
      }
      // Vracamo gresku 409 Confict ako postoje isti profesori

      if (existsErrors.length > 0) {
        throw new HttpException(existsErrors, 409);
      }

      // Sacuvamo profesora i vratimo ga
      const savedProfessor = await this.professorRepo.save(newProfessor);
      // Ako nekim slucajem nije sacuvan profesor vracamo gresku
      // 500 Server error
      if (!savedProfessor) {
        throw new HttpException('Professor not saved', 500);
      } else {
        return { error: null, type: 'professor' };
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async loginProfessor(loginProfessorData: LoginProfessorDto) {
    try {
      // Trazimo profesora sa istim username
      let professor = await this.professorRepo.findOne({
        username: loginProfessorData.username,
      });
      // Ako profesor ne postoji vracamo 404 not found
      if (!professor) {
        throw new HttpException('No professor found', 404);
      }
      // Da li se sifre poklapaju
      const isPasswordMatch = await bcrypt.compare(
        loginProfessorData.password,
        professor.password,
      );
      // Ako se na poklapaju sifre vracamo 403 unauthorized
      if (!isPasswordMatch) {
        throw new HttpException('Invalid password', 403);
      }

      const payload = {
        _id: professor._id,
        username: professor.username,
        type: 'professor',
        sub: professor._id,
      };
      // Vracamo accessToken i expiresAt(broj milisekundi)
      return {
        accessToken: this.jwtService.sign(payload),
        expiresAt: new Date().getTime() + 3600 * 1000 * 24,
        type: 'professor',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async getAllProfessorsByEmailOrUsernameOrPhone(
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
    // Pretraga profesora po email ili username ili phoneNumber
    return this.professorRepo.find({
      where: filterArray,
    });
  }
}
