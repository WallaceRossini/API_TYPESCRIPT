import { plainToClass } from 'class-transformer';
import { Body, JsonController, Post } from 'routing-controllers';
import { getRepository, Repository } from 'typeorm';
import { UsersDto } from '../../../dto';
import { RoleType } from '../../../enum';
import { Users } from '../../models'
import bcrypt from 'bcryptjs';

@JsonController('/auth')
export class AuthController {

  @Post('/register')
  public async newUser(
    @Body() userDto: UsersDto
  ) {
    try {

      const userRepository: Repository<Users> = getRepository(Users)

      const verificyEmail = await userRepository.findOne({
        where: {
          email: userDto.email
        }
      })

      if (verificyEmail != undefined)
        return { success: false, message: 'Email já em uso' }

      const hash = await bcrypt.hash(userDto.password, 10)

      const user = plainToClass(Users, {
        name: userDto.name,
        email: userDto.email,
        password: hash,
        role: RoleType.DEVELOPER
      })

      const response = await userRepository.save(user);

      const userFormat = plainToClass(UsersDto, {
        id: response.id,
        name: response.name,
        email: response.email,
      })

      return {
        success: true, data: userFormat
      }

    } catch (e) {
      console.log(`🛑 ERRO: ${e}`);
      return { success: false, details: e.message }
    }
  }
}