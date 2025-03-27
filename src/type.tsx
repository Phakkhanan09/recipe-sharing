export interface Ingredient {
  name: string; //กำหนดให้ Name เป็น String เวลาเรียกใช้ name ถ้าเกิดว่าป้อนค่าเป็นอย่างอื่นที่ไม่ใช่ String มันจะ error
  quantity: string;
}
export interface Recipe { //เอา Component เข้าไปใช้ร่วมกับ Firebase
  id?: string; //ID ของเมนู (Optional เพราะ Firebase จะสร้างให้เอง)
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  imageUrl: string;
}
