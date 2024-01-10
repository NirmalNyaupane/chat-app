import { UserEntity } from "../../entities/user/user.entity";
import ApiError from "../../utils/ApiError";
import { RegisterUserValidation } from "../../validators/auth.validator";
import commonService from "../common.service";

class AuthService {
  async register(body: RegisterUserValidation) {
    const user = await commonService.emailIsRegisterOrNot(body.email);
    if (user) {
      throw new ApiError(400, "User with this email is already exits");
    }

    const u = new UserEntity();
    u.name = body.name;
    u.email = body.email;
    u.password = body.password;

    const response = await UserEntity.save(u);
    return response;
  }


  async verifyEmail(id: string) {
    const updateResponse = await UserEntity.update(
      { id: id },
      {isVerified:true}
    );
    return updateResponse;
  }

  async resetPassword(id:string, newPassword:string){
      const updatedResponse = await UserEntity.update({id:id},{password:newPassword})
      return updatedResponse;
  }
}

export default new AuthService();
