import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import configuration from './config/configuration';
import { StudentEntity } from './shared/entities/student.entity';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
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
        username: 'root',
        password: 'DusanDux001!',
        database: 'professor-student-db',
        entities: [StudentEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
