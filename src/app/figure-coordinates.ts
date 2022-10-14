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
    x: -50,
    y: 570,
    width: 500,
    height: 100,
  },
  {
    figureType: FigureType.star1,
    x: 350,
    y: 250,
    width: 20,
    height: 20,
  },
  {
    figureType: FigureType.star1,
    x: 50,
    y: 450,
    width: 20,
    height: 20,
  },
  {
    figureType: FigureType.star2,
    x: 290,
    y: 40,
    width: 20,
    height: 20,
  },
  {
    figureType: FigureType.star2,
    x: 70,
    y: 210,
    width: 20,
    height: 20,
  },
  {
    figureType: FigureType.star3,
    x: 360,
    y: 470,
    width: 20,
    height: 20,
  },
  {
    figureType: FigureType.star3,
    x: 110,
    y: 360,
    width: 20,
    height: 20,
  },
  {
    figureType: FigureType.star4,
    x: 80,
    y: 510,
    width: 20,
    height: 20,
  },
  {
    figureType: FigureType.star4,
    x: 320,
    y: 160,
    width: 20,
    height: 20,
  },
  {
    figureType: FigureType.star5,
    x: 80,
    y: 80,
    width: 20,
    height: 20,
  },
  {
    figureType: FigureType.star5,
    x: 310,
    y: 370,
    width: 20,
    height: 20,
  },
  {
    figureType: FigureType.shipEngineOn,
    x: 180,
    y: 100,
    width: 50,
    height: 100,
  },
  {
    figureType: FigureType.shipEngineOff,
    x: 180,
    y: 300,
    width: 50,
    height: 100,
  },
];
