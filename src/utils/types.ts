export interface IIngredientCard {
  type?: string;
  name: string;
  price: number;
  _id: string;
  image: string;
  uniqID: number;
  index?: number;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

export interface IIngredients extends Array<IIngredientCard> {}

export type TSubmitHandler = React.FormEventHandler<HTMLFormElement>;
