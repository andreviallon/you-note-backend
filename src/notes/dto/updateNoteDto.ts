import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  public videoLink: string;

  @IsString()
  public content: string;
}
