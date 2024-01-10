import { UserEntity } from "../entities/user/user.entity";
import ApiError from "../utils/ApiError";

class CommonService {
  async emailIsRegisterOrNot(email: string) {
    const user = await UserEntity.findOneBy({ email });
    return user;
  }

  async checkUserIsExitOrNot(userId: string) {
    const user = await UserEntity.findOneBy({ id: userId });
    if (!user) {
      throw new ApiError(400, "User is not exits");
    }
    return user;
  }
}

export default new CommonService();
