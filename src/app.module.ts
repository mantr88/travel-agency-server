import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { connect } from './connect-db';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot({
    ...connect,
    type: 'postgres',
    logging: true,
    entities: ['dist/**/entities/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
  }), UsersModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { constructor(private dataSource: DataSource) { } }
