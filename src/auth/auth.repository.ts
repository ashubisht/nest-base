import { Repository, EntityRepository } from "typeorm";
import { User } from "./entity/user.entity";
import { Credentials } from "./dto/credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {

  async signUp(user: User) {
    try {
      await user.save();
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username already exists");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // SignIn functionality is done by finding the user and validate its password hash, which is implicitly
  // provided by the AuthRepository.

}