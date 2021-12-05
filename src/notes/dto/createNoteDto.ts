import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  public title: string;
}
