import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Recipe } from "./type";
import { db } from "./firebase";
import "./styles.css";


const ListMenu = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ฟังก์ชันสำหรับดึงข้อมูลเมนูอาหารจาก Firestore
  const fetchRecipes = async () => {
    setLoading(true);
    setError(null); 
    try {
      // ดึงข้อมูลทั้งหมดจากคอลเลกชัน "recipes" ใน Firestore
      const querySnapshot = await getDocs(collection(db, "recipes"));
      // สร้างรายการเมนูอาหารจาก querySnapshot โดยการ map แต่ละ Document
      const recipeList = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ใช้ Document ID จาก Firestore
        ...doc.data(), //ดึงข้อมูล Doc จาก Firestore
      }));
      setRecipes(recipeList as Recipe[]);
      console.log("Fetched recipes:", recipeList);
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการดึงข้อมูลเมนูอาหาร");
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };
  // ฟังก์ชันสำหรับลบเมนูอาหารจาก Firestore
  const handleDelete = async (docId: string) => {
    const isConfirmed = window.confirm("ต้องการลบเมนูอาหารนี้ใช่หรือไม่?");
    if (isConfirmed) {
      try {
        // ลบเอกสารโดยตรงโดยใช้ Document ID
        await deleteDoc(doc(db, "recipes", docId));
        
        // อัปเดต UI โดยลบเมนูที่มี ID ตรงกับ docId ออกจาก state
        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== docId));
        alert("ลบเมนูสำเร็จ!");
      } catch (error: any) {
        console.error("Error deleting recipe:", error.message);
        alert(`เกิดข้อผิดพลาดในการลบเมนู: ${error.message}`);
      }
    }
  };
// useEffect Hook จะทำงานหลังจาก Component ถูก Render ครั้งแรก
  useEffect(() => {
    fetchRecipes();//เรียกฟังก์ชัน fetchRecipes เพื่อดึงข้อมูลเมนูอาหารเมื่อ Component
  }, []);

  return (
    <div 
      className="list-menu-container" 
      style={{ 
        backgroundImage: 'url(/images/foodbg.jpg)',
        backgroundColor: 'rgb(0, 0, 0)',
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        paddingTop: "20px"
      }}
    >
      
      <header className="header" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
        <nav>
          <Link to="/" className="add-recipe-btn">หน้าแรก</Link>
          <Link to="/list-menu" className="add-recipe-btn2">เมนูอาหาร</Link>
        </nav>
      </header>
     
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>

      <div className="recipe-list">
        {loading ? (
          <p>กำลังโหลด...</p>
        ) : error ? (
          <p>{error}</p>
        ) : recipes.length === 0 ? (
          <p>ไม่มีเมนูอาหารในขณะนี้</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-item">
              <h2>{recipe.title}</h2>
              <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
              
              <div className="recipe-actions">
                <Link to={`/recipes/${recipe.id}`} className="view-btn">ดูรายละเอียด</Link>
                <button onClick={() => handleDelete(recipe.id!)} className="delete-btn">ลบเมนู</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="add-menu-container">
        <Link to="/add-recipe" className="add-recipe-menu">เพิ่ม</Link>
      </div>
    </div> 
  );
};

export default ListMenu;