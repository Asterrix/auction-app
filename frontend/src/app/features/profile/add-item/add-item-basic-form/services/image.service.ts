import {Injectable} from "@angular/core";

interface ImageServiceInterface {
  addImage(images: FileList): Promise<string[]>;

  removeImage(images: string[], image: string): string[];

  filterDuplicates(images: string[], newImages: string[]): string[];
}

@Injectable({providedIn: "root"})
export class ImageService implements ImageServiceInterface {
  protected allowedImageTypes = new Set<string>(["image/jpeg", "image/png", "image/jpg"]);

  public async addImage(images: FileList): Promise<string[]> {
    const result: string[] = [];
    const imagesLength = images.length;

    if (images && imagesLength > 0) {
      for (let i = 0; i < imagesLength; i++) {

        if (!this.allowedImageTypes.has(images.item(i)!.type)) {
          break;
        }

        const reader: FileReader = new FileReader();

        const [imageData] = await Promise.all([new Promise((resolve) => {
          reader.onload = (e: ProgressEvent<FileReader>) => {
            resolve(e.target?.result);
          };
          reader.readAsDataURL(images.item(i)!);
        })]);

        result.push(<string>imageData);
      }
    }

    return result;
  };

  public removeImage(images: string[], image: string): string[] {
    return images.filter((img: string) => img !== image);
  };

  public filterDuplicates(images: string[], newImages: string[]): string[] {
    const concatenatedArray: string[] = images.concat(newImages);
    return Array.from(new Set(concatenatedArray));
  }
}
