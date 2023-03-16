import { Ingredient } from './ingredient.model';

export class Smoothie {
  public id: number;
  public name: string;
  public description: string;
  public ingredients: Ingredient[];

  constructor(
    id: number,
    name: string,
    desc: string,
    ingredients: Ingredient[]
  ) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.ingredients = ingredients;
  }
}
