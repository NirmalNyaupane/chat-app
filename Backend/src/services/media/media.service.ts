
import { MediaEntity } from "../../entities/media/media.entity";


class MediaService {
    async insert(fileUrl: string, mimeType: string) {
        const media = new MediaEntity();
        media.name = fileUrl;
        media.mimeType = mimeType;

        return await MediaEntity.save(media);
    }

    async getMediaById(id: string) {
        return await MediaEntity.findOne({ where: { id } })
    }
}

export const mediaService = new MediaService();