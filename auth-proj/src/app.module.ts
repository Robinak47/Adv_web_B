import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuard } from './auth/jwtGuard.guard';
import { RolesGuard } from './auth/roles/roles.guard';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'auth_b',
      autoLoadEntities: true,
      synchronize: true,
    }),
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: 'APP_GUARD',
      useClass: JwtGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
