import { OTPType } from "../../constants";
import { OtpEntity } from "../../entities/otp/otp.entity";
import { UserEntity } from "../../entities/user/user.entity";

class OtpService {
  async checkOtpExitsOrNot(otpId: string) {
    const response = await OtpEntity.findOneBy({ id: otpId });
    return response;
  }

  insert = async (otp: string, user: UserEntity, otpType: OTPType, expiryTime: string | number) => {

    //check otp of user is exits or not
    //if otp exit destroy the otp
    const checkOtp = await OtpEntity.createQueryBuilder("otp")
      .leftJoin("otp.user", "user")
      .select(["otp.otp","otp.id"])
      .where("user.email=:email", {
        email: user.email,
      })
      .getOne();

      console.log(checkOtp);
    if (checkOtp) {
      await OtpEntity.delete({ id: checkOtp.id });
    }

    const otpObj = new OtpEntity();
    otpObj.otp = otp;
    otpObj.user = user;
    otpObj.expiryDate = new Date(expiryTime);
    otpObj.otpType = otpType;
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
