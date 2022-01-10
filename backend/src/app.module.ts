import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import configuration from './config/configuration';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';

import { Address } from './shared/entities/address.entity';
import { ContactInfo } from './shared/entities/contact-info.entity';
import { GroupDetails } from './shared/entities/group-details.entity';
import { SelectedSubject } from './shared/entities/selected-subject.entity';
import { SubjectDetails } from './shared/entities/subject-details.entity';
import { User } from './shared/entities/user.entity';
import { SubjectModule } from './subjects/subject.module';

@Module({
  imports: [
    AuthModule,
    SubjectModule,
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
          User,
          Address,
          ContactInfo,
          GroupDetails,
          SubjectDetails,
          SelectedSubject,
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
