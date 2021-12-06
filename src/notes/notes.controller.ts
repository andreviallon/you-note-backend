import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateNoteDto } from './dto/createNoteDto';
import { UpdateNoteDto } from './dto/updateNoteDto';
import { Note } from './note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getNotes(@GetUser() user: User): Promise<Note[]> {
    return this.notesService.getNotes(user);
  }

  @Get('/:id')
  getNoteById(@Param('id') id: string, @GetUser() user: User): Promise<Note> {
    return this.notesService.getNoteById(id, user);
  }

  @Post()
  createNote(
    @Body() createNoteDto: CreateNoteDto,
    @GetUser() user: User,
  ): Promise<Note> {
    return this.notesService.createNote(createNoteDto, user);
  }

  @Patch('/:id')
  updateNote(
    @Param('id') id: string,
    @Body() updateNoteStatusDto: UpdateNoteDto,
    @GetUser() user: User,
  ): Promise<Note> {
    return this.notesService.updateNote(id, updateNoteStatusDto, user);
  }

  @Delete('/:id')
  deleteNote(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.notesService.deleteNote(id, user);
  }
}
