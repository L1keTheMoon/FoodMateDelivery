export interface Meal {
  id: string,
  name: string,
  image: string,
  price: string
}
export interface Order {
  meal: Meal,
  quantity: number
}