import { IsString, MinLength, MaxLength } from "class-validator";

export class Credentials {
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  username: string;

  @IsString()
  @MinLength(12)
  @MaxLength(50)
  // @Matches can be used for regex. Not using here for the quick approach
  password: string; // can be passphraze
}