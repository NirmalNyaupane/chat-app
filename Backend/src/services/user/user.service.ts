import { AppDataSource } from "../../config/database.config";
import { MediaEntity } from "../../entities/media/media.entity";
import { UserEntity } from "../../entities/user/user.entity";
import ApiError from "../../utils/ApiError";
import commonService from "../common.service";
interface ChatFilterType {
    page?: number,
    limit?: number,
}
class UserService {
    async updateProfilePicture(mediaId: string, user: UserEntity) {
        const media = await MediaEntity.findOneBy({ id: mediaId });
        if (!media) {
            throw new ApiError(400, "mediaId doesnot mathced");
        }
        const u = await commonService.emailIsRegisterOrNot(user.email);
        if (u) {
            u.profile = media;
            const response = await UserEntity.save(u);
            const { password, ...remainingInfo } = response;
            return remainingInfo;
        }
    }

    async findMultipleUserbyIds(userId: string[]) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const results = userId.map((singleParticipant) => {
                return queryRunner.manager.createQueryBuilder(UserEntity, "user").leftJoinAndSelect("user.profile", "media").where("user.id=:id", {
                    id: singleParticipant
                }).getOne()
            })

            await queryRunner.commitTransaction();
            return Promise.all(results);
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    async findUserForChat(options: ChatFilterType, email: string, requestedUserId: string) {
        const builder = UserEntity.createQueryBuilder("user").where("user.email=:email", {
            email: email.trim()
        }).andWhere("user.isVerified=:verified", {
            verified: true
        }).andWhere("user.id is distinct from :id",{
            id:requestedUserId
        })

        if (options.limit) {
            builder.limit(options.limit);

            if (options.page) {
                const take = (options.page - 1) * options.limit;
                builder.take(take);
            }
        }

        return await builder.getManyAndCount()
    }
}

export default new UserService();