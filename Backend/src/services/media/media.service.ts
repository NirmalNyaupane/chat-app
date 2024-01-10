// class CommonMediaService{
//     //check media is present or not 
//     isMedia
// }

import { MediaEntity } from "../../entities/media/media.entity";


class MediaService{
    async insert (fileUrl:string, mimeType:string){
        const media  = new MediaEntity();
        media.name=fileUrl;
        media.mimeType = mimeType;

        return await MediaEntity.save(media);
    }
}

export const mediaService = new MediaService();