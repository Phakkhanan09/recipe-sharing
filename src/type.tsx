export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Review {
  userId: string;
  rating: number;
  comment: string;
}

export interface Recipe {
  id?: string; 
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  imageUrl: string;
  reviews: Review[];
  userId: string;
}
