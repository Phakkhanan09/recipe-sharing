import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Recipe } from "./type";
import { db } from "./firebase";
import { Ingredient } from "./type";
import { Link } from "react-router-dom";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", quantity: "" }]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      title,
      description,
      ingredients: ingredients, 
      instructions: instructions, 
      imageUrl,
    };

    try {
      const docRef = await addDoc(collection(db, "recipes"), newRecipe);
      console.log("เพิ่มเมนูสำเร็จ ID:", docRef.id);
      alert("เพิ่มเมนูอาหารเรียบร้อย");
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มเมนู");
    }
  };

  return (
    <div
      className="add-recipe-container"
      style={{
        backgroundImage: 'url(/images/foodbg2.png)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <div>
        <header className="header" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
          <nav>
            <Link to="/" className="add-recipe-btn">หน้าแรก</Link>
            <Link to="/list-menu" className="add-recipe-btn2">เมนูอาหาร</Link>
          </nav>
        </header>
      </div>

      <div>
        <h1>เพิ่มเมนูอาหาร</h1>
        <br />

        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            placeholder="ชื่อเมนูอาหาร"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="input-field"
            placeholder="ส่วนประกอบ"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <textarea
            className="input-field"
            placeholder="ขั้นตอนการทำ"
            value={instructions.join("\n")}
            onChange={(e) => setInstructions(e.target.value.split("\n"))}
            required
          />
          <input
            className="input-field"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImageUrl(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
            required
          />
          <br />
          <button type="submit">ยืนยัน</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;