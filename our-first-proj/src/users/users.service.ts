import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public getUsers(): String {
    return 'all users from service';
  }

  public getUserById(id: string): String {
    return `user by id ${id} from service`;
  }
}
