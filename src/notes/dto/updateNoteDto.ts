import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  public videoLink: string;

  @IsString()
  public content: string;
}
