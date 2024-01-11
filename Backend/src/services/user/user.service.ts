import { MediaEntity } from "../../entities/media/media.entity";
import { UserEntity } from "../../entities/user/user.entity";
import ApiError from "../../utils/ApiError";
import commonService from "../common.service";

class UserService{  
    async updateProfilePicture(mediaId:string, user:UserEntity){
        const media = await MediaEntity.findOneBy({id:mediaId});
        if(!media){
            throw new ApiError(400,"mediaId doesnot mathced");
        }
        const u = await commonService.emailIsRegisterOrNot(user.email);
        if(u){
            u.profile = media;
            const response = await UserEntity.save(u);
            const{password, ...remainingInfo} = response;
            return remainingInfo;
        }
    }
}

export default new UserService();