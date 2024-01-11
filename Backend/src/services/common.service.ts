import { UserEntity } from "../entities/user/user.entity";
import ApiError from "../utils/ApiError";

class CommonService {
  async emailIsRegisterOrNot(email: string) {
    // const user = await UserEntity.findOneBy({ email });
    const user = await UserEntity.createQueryBuilder("user").leftJoin("user.profile","media").select(["user.id","user.name","user.email","user.password","user.isVerified","user.createdAt","user.deletedAt","user.updatedAt","user.profile","media.id"]).where("user.email=:email",{email:email}).getOne()
    return user;
  }

  async checkUserIsExitOrNot(userId: string) {
    const user = await UserEntity.findOne({
      where:{
        id:userId
      },
      relations:["profile"]
    });
    if (!user) {
      throw new ApiError(400, "User is not exits");
    }
    return user;
  }
}

export default new CommonService();
