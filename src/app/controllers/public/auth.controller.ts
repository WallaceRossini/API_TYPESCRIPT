import { plainToClass } from 'class-transformer';
import { Body, JsonController, Post } from 'routing-controllers';
import { getRepository, Repository } from 'typeorm';
import { AuthenticationDto, ForgotPasswordDto, RegisterDto } from '../../../dto';
import { RoleType } from '../../../enum';
import { Users } from '../../models'
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

@JsonController('/auth')
export class AuthController {

  @Post('/register')
  public async register(
    @Body() userDto: RegisterDto
  ) {
    try {

      const userRepository: Repository<Users> = getRepository(Users)

      const checkEmail = await userRepository.findOne({
        where: {
          email: userDto.email
        }
      })

      if (checkEmail != undefined)
        return { success: false, message: 'Email já em uso' }

      const hash = await bcrypt.hash(userDto.password, 10)

      const user = plainToClass(Users, {
        name: userDto.name,
        email: userDto.email,
        password: hash,
        role: RoleType.DEVELOPER
      })

      const response = await userRepository.save(user);

      const userFormat = plainToClass(RegisterDto, {
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

  @Post('/authentication')
  public async authentication(
    @Body() authDto: AuthenticationDto
  ) {
    try {

      const userRepository: Repository<Users> = getRepository(Users)

      const response = await userRepository.findOne({
        where: {
          email: authDto.email
        }
      })

      if (!response)
        return { success: false, message: "Email e/ou senha incorretos!" }

      const checkPassword = await bcrypt.compare(authDto.password, response.password)

      if (checkPassword !== true)
        return { success: false, message: "Email e/ou senha incorretos!" }

      const data = plainToClass(AuthenticationDto, {
        "id": response.id,
        "name": response.name,
        "email": response.email
      })

      return { success: true, data }

    } catch (e) {
      console.log(`🛑 ERRO: ${e}`);
      return { success: false, details: e.message }
    }
  }

  @Post('/forgot_password')
  public async forgotPasssword(
    @Body() forgotPassDto: ForgotPasswordDto
  ) {
    try {

      const userRepository: Repository<Users> = getRepository(Users)

      const response = await userRepository.findOne({
        where: {
          email: forgotPassDto.email
        }
      })

      if (!response)
        return { success: false, message: "Email inválido!" }

      const resetToken = crypto.randomBytes(20).toString('hex');

      const now = new Date();

      const resetExpires = new Date(now.setHours(now.getHours() + 1));

      await userRepository.save({
        id: response.id,
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires
      })

      return { success: true, message: "Verifique seu email, para redefinir sua senha" }

    } catch (e) {
      console.log(`🛑 ERRO: ${e}`);
      return { success: false, details: e.message }
    }

  }
}