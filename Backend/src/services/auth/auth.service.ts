import { MediaEntity } from "../../entities/media/media.entity";
import { UserEntity } from "../../entities/user/user.entity";
import ApiError from "../../utils/ApiError";
import { generateHashValue } from "../../utils/helper";
import { RegisterUserValidation } from "../../validators/auth.validator";
import commonService from "../common.service";

class AuthService {
  async register(body: RegisterUserValidation, media: MediaEntity | null) {
    const user = await commonService.emailIsRegisterOrNot(body.email);
    if (user) {
      throw new ApiError(400, "User with this email is already exist");
    }

    const u = new UserEntity();
    u.name = body.name;
    u.email = body.email;
    const hashPassword = await generateHashValue(body.password)
    u.password = hashPassword;
    if (media) {
      u.profile = media
    }
    const response = await UserEntity.save(u);
    return response;
  }


  async verifyEmail(id: string) {
    const updateResponse = await UserEntity.update(
      { id: id },
      { isVerified: true }
    );
    return updateResponse;
  }

  async resetPassword(user: UserEntity, newPassword: string) {
    const hashPassword = await generateHashValue(newPassword);
    user.password = hashPassword;
    const response = await UserEntity.save(user);
    const { password, ...remainingInfo } = response;
    return remainingInfo;
  }
}

export default new AuthService();
