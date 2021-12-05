import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateNoteDto } from './dto/createNoteDto';
import { UpdateNoteDto } from './dto/updateNoteDto';
import { Note } from './note.entity';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesRepository)
    private notesRepository: NotesRepository,
  ) {}

  public getNotes(user: User): Promise<Note[]> {
    return this.notesRepository.getNotes(user);
  }

  public async getNoteById(id: string, user: User): Promise<Note> {
    const note = await this.notesRepository.findOne({ id, user });

    if (!note) {
      throw new NotFoundException(`Note with id '${id}' not found... :(`);
    }

    return note;
  }

  public async createNote(
    createNoteDto: CreateNoteDto,
    user: User,
  ): Promise<Note> {
    const note = this.notesRepository.createNote(createNoteDto, user);

    try {
      await this.notesRepository.save(note);
      return note;
    } catch (error) {
      throw new InternalServerErrorException('Note could not be saved... :(');
    }
  }

  public async deleteNote(id: string, user: User): Promise<void> {
    const result = await this.notesRepository.delete({ id, user });
    if (!result) {
      throw new InternalServerErrorException('Note could not be deleted... :(');
    }

    if (result.affected === 0) {
      throw new NotFoundException(`Note with id '${id}' not found`);
    }
  }

  public async updateNote(
    updateNoteDto: UpdateNoteDto,
    user: User,
  ): Promise<Note> {
    const note = await this.getNoteById(updateNoteDto.id, user);

    note.title = updateNoteDto.title;
    note.videoLink = updateNoteDto.videoLink;
    note.content = updateNoteDto.content;

    try {
      await this.notesRepository.save(note);
      return note;
    } catch (error) {
      throw new InternalServerErrorException('Note could not be updated... :(');
    }
  }
}
