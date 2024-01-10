import { OtpEntity } from "../../entities/otp/otp.entity";
import { UserEntity } from "../../entities/user/user.entity";

class OtpService {
  async checkOtpExitsOrNot(otpId: string) {
    const response = await OtpEntity.findOneBy({ id: otpId });
    return response;
  }

  insert = async (otp: string, user: UserEntity) => {
    const otpObj = new OtpEntity();
    otpObj.otp = otp;
    otpObj.user = user;
    otpObj.expiryDate = new Date(Date.now() + 1000 * 60);
    return await OtpEntity.save(otpObj);
  };

  async find(user: UserEntity) {
    const currentDate = new Date(Date.now());
    const findUser = await OtpEntity.createQueryBuilder("otp")
      .leftJoin("otp.user", "user")
      .select("otp.otp")
      .where("user.email=:email", {
        email: user.email,
      })
      .andWhere("otp.expiry_date > :current", {
        current: currentDate,
      })
      .getOne();

    return findUser;
  }
}

export default new OtpService();
