import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/shared/entities/student.entity';
import { JwtStrategy } from './providers/jwt.strategy';
import { StudentAuthService } from './providers/student-auth.service';
import { ProfessorAuthService } from './providers/professor-auth.service';
import { ProfessorEntity } from 'src/shared/entities/professor.entity';

@Module({
  controllers: [AuthController],
  providers: [StudentAuthService, ProfessorAuthService, JwtStrategy],
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
    TypeOrmModule.forFeature([StudentEntity, ProfessorEntity]),
  ],
})
export class AuthModule {}
