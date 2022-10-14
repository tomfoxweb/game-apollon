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
    [FigureType.shipEngineOff, '../assets/images/rocket.svg'],
    [FigureType.shipEngineOn, '../assets/images/rocket-active.svg'],
    [FigureType.earth, '../assets/images/earth.svg'],
    [FigureType.moon, '../assets/images/moon.svg'],
    [FigureType.star1, '../assets/images/star1.svg'],
    [FigureType.star2, '../assets/images/star2.svg'],
    [FigureType.star3, '../assets/images/star3.svg'],
    [FigureType.star4, '../assets/images/star4.svg'],
    [FigureType.star5, '../assets/images/star5.svg'],
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
