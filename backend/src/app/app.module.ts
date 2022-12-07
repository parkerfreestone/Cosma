import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core.module';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: `postgresql://${config.get('DB_USER')}:${config.get(
          'DB_PASSWORD',
        )}@localhost:${config.get('DB_PORT')}/${config.get('DB_NAME')}`,
        synchronize: true,
        entities: ['dist/src/entities/**/*.js'],
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PostsModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
