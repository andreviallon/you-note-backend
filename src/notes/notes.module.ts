import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { NotesRepository } from './notes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NotesRepository]), AuthModule],
})
export class NotesModule {}
