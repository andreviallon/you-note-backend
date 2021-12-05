import { EntityRepository, Repository } from 'typeorm';
import { Note } from './note.entity';
import { User } from 'src/auth/user.entity';
import { CreateNoteDto } from './dto/createNoteDto';

@EntityRepository(Note)
export class NotesRepository extends Repository<Note> {
  public getNotes(user: User): Promise<Note[]> {
    const query = this.createQueryBuilder('note');

    query.where({ user });

    return query.getMany();
  }

  public createNote(createNoteDto: CreateNoteDto, user: User): Note {
    const { title } = createNoteDto;

    return this.create({
      title,
      user,
    });
  }
}
