import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { NotesController } from './notes.controller';
import { NotesRepository } from './notes.repository';
import { NotesService } from './notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotesRepository]), AuthModule],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
