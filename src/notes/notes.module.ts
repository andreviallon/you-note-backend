import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { NotesRepository } from './notes.repository';
import { NotesService } from './notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotesRepository]), AuthModule],
  providers: [NotesService],
})
export class NotesModule {}
