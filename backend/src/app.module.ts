import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import configuration from './config/configuration';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';
import { LearingWayModule } from './learingWay/learing-way.module';
import { LearningWayEntity } from './shared/entities/learning-way.entity';
import { ProfessorEntity } from './shared/entities/professor.entity';
import { StudentEntity } from './shared/entities/student.entity';
import { SubjectEntity } from './shared/entities/subject.entity';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [
    AuthModule,
    SubjectsModule,
    LearingWayModule,
    // TypeOrmModule.forFeature([LearningWayEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('database.dbhost'),
        port: +config.get('database.dbport'),
        username: config.get('database.dbusername'),
        password: config.get('database.dbpassword'),
        database: config.get('database.dbname'),
        entities: [
          StudentEntity,
          ProfessorEntity,
          SubjectEntity,
          LearningWayEntity,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule {}
