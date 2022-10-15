import { FigureType } from './game-images';

export interface FigureCoordinate {
  figureType: FigureType;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const figureCoordinates: FigureCoordinate[] = [
  {
    figureType: FigureType.earth,
    x: 10,
    y: 10,
    width: 50,
    height: 50,
  },
  {
    figureType: FigureType.moon,
    x: -235,
    y: 351,
    width: 700,
    height: 100,
  },
  {
    figureType: FigureType.star1,
    x: 330,
    y: 250,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star1,
    x: 50,
    y: 330,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star1,
    x: 150,
    y: 150,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star1,
    x: 50,
    y: 250,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star2,
    x: 290,
    y: 40,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star2,
    x: 70,
    y: 210,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star2,
    x: 170,
    y: 310,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star2,
    x: 370,
    y: 140,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star3,
    x: 260,
    y: 305,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star3,
    x: 110,
    y: 320,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star3,
    x: 350,
    y: 180,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star3,
    x: 250,
    y: 80,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star4,
    x: 80,
    y: 290,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star4,
    x: 305,
    y: 160,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star4,
    x: 170,
    y: 50,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star4,
    x: 270,
    y: 30,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star5,
    x: 80,
    y: 80,
    width: 15,
    height: 15,
  },
  {
    figureType: FigureType.star5,
    x: 310,
    y: 250,
    width: 10,
    height: 10,
  },
  {
    figureType: FigureType.star5,
    x: 180,
    y: 220,
    width: 10,
    height: 10,
  },
  {
    figureType: FigureType.star5,
    x: 260,
    y: 150,
    width: 10,
    height: 10,
  },
];
