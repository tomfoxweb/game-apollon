import { Injectable } from '@angular/core';
import { FigureType } from './game-images';

interface ImageInfo {
  type: FigureType;
  image: HTMLImageElement;
}

@Injectable({
  providedIn: 'root',
})
export class ImageProviderService {
  private imgSources = new Map<FigureType, string>([
    [FigureType.shipEngineOff, '../assets/images/rocket.png'],
    [FigureType.shipEngineOn, '../assets/images/rocket-active.png'],
    [FigureType.earth, '../assets/images/earth.png'],
    [FigureType.moon, '../assets/images/moon.png'],
    [FigureType.star1, '../assets/images/star1.png'],
    [FigureType.star2, '../assets/images/star2.png'],
    [FigureType.star3, '../assets/images/star3.png'],
    [FigureType.star4, '../assets/images/star4.png'],
    [FigureType.star5, '../assets/images/star5.png'],
  ]);

  constructor() {}

  async loadImages(): Promise<Map<FigureType, HTMLImageElement>> {
    const promiseImages: Promise<ImageInfo>[] = [];
    for (const [key, value] of this.imgSources) {
      const image = new Image();
      image.alt = key.toString();
      image.src = value;
      const promiseLoad = new Promise<ImageInfo>((resolve) => {
        image.addEventListener('load', () => {
          resolve({ type: key, image: image });
        });
      });
      promiseImages.push(promiseLoad);
    }
    const imagesInfo = await Promise.all(promiseImages);
    const imagesInfoMap = new Map<FigureType, HTMLImageElement>();
    for (const info of imagesInfo) {
      imagesInfoMap.set(info.type, info.image);
    }
    return imagesInfoMap;
  }
}
