import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ImageService {
  private allowedImageTypes: Set<string> = new Set<string>(["image/jpeg", "image/png", "image/jpg"]);

  public async addImage(images: FileList): Promise<Map<string, File>> {
    const result: Map<string, File> = new Map<string, File>();

    for (let i = 0; i < images.length; i++) {
      const imageFile: File | null = images.item(i);

      if (!imageFile || !this.allowedImageTypes.has(imageFile.type)) {
        break;
      }

      const reader: FileReader = new FileReader();

      const [newImage] = await Promise.all([
        new Promise(resolve => {
          reader.onload = ev => {
            resolve(ev.target?.result);
          };
          reader.readAsDataURL(imageFile);
        })
      ]);

      result.set(<string>newImage, imageFile);
    }

    return result;
  }

  public removeImage(imageMap: Map<string, File>, image: string): Map<string, File> {
    if (imageMap.has(image)) {
      imageMap.delete(image);
    }
    return imageMap;
  }
}
