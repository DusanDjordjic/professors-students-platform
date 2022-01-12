import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from './providers/jwt.strategy';
import { User } from 'src/shared/entities/user.entity';
import { ContactInfo } from 'src/shared/entities/contact-info.entity';
import { Address } from 'src/shared/entities/address.entity';
import { AuthService } from './providers/auth.service';
import { ValidateService } from './providers/validate.service';
import { ValidateController } from './controllers/validate.controller';
import { SelectedSubject } from 'src/shared/entities/selected-subject.entity';
import { SubjectDetails } from 'src/shared/entities/subject-details.entity';

@Module({
  controllers: [AuthController, ValidateController],
  providers: [JwtStrategy, AuthService, ValidateService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: 3600 * 24,
        },
      }),

      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User,
      ContactInfo,
      Address,
      SelectedSubject,
      SubjectDetails,
    ]),
  ],
})
export class AuthModule {}
