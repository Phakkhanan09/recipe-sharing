import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "./firebase";
import { Recipe } from "./type";

const EditRecipe = () => {
  const { id } = useParams(); //ไปที่ url ที่อยู่ id นั้นๆ
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) {
      setError("ไม่พบข้อมูลเมนู...");
      return;
    }
     // ฟังก์ชันสำหรับดึงข้อมูลเมนูอาหารจาก Firestore โดยใช้ 'id' ที่ได้จาก URL
    const fetchRecipe = async () => {
      setLoading(true);
      try {    
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const recipeData = { id: docSnap.id, ...docSnap.data() } as Recipe;
          setRecipe(recipeData);
        } else {
          setError("ไม่พบเมนูอาหารนี้ในระบบ");
        }
      } catch (error) {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลเมนู");
        console.error("Error fetching recipe:", error);
      }
      setLoading(false);
    };

    fetchRecipe();// เรียกฟังก์ชัน fetchRecipe เพื่อดึงข้อมูลเมื่อ Component เมื่อ id เปลี่ยนแปลง
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (recipe && name) {
      setRecipe({
        ...recipe,
        [name]: value,
      });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && recipe && id) {
      setLoading(true);
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `recipes/${id}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setRecipe({ ...recipe, imageUrl: downloadURL });
      } catch (error) {
        setError("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipe || !id) return;

    try {
      setLoading(true);
      const docRef = doc(db, "recipes", id);
      await updateDoc(docRef, {
        title: recipe.title,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
        instructions: recipe.instructions,
      });
      alert("แก้ไขเมนูอาหารเรียบร้อยแล้ว");
      navigate(`/recipes/${id}`);
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการแก้ไขเมนูอาหาร");
      console.error("Error updating recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>ไม่พบข้อมูลเมนู...</div>;

  return (
    <div
      className="edit-recipe-container"
      style={{
        backgroundImage: "url(/images/foodbg2.png)",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>แก้ไขเมนูอาหาร</h2>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className=" custom-textarea">
          <label>ชื่อเมนู:</label><br/>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="edit-field"
            required
          />
        </div>

        <div className="custom-textarea">
          <label>รายละเอียดส่วนประกอบ:</label><br/>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            className="edit-field "
            rows={5}
            required
          />
        </div>

        <div className="custom-textarea">
          <label>รูปภาพ:</label><br/>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "block", marginBottom: "10px" }}
          />
          {recipe.imageUrl && (
            <div className="image-preview">
              <img
                src={recipe.imageUrl}
                alt="ตัวอย่างรูปภาพ"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            </div>
          )}
        </div>

        <div className="custom-textarea">
          <label>ขั้นตอนการทำ:</label> <br/>
          <textarea
            name="instructions"
            value={recipe.instructions ? recipe.instructions.join('\n') : ''}
            onChange={(e) => {
              if (recipe) {
                setRecipe({
                  ...recipe,
                  instructions: e.target.value.split('\n'),
                });
              }
            }}
            className="edit-field"
            rows={10}
            required
          />
        </div>
        <br/>
        <div className="form-actions">
          <button type="button" className="cencel-btn" onClick={() => navigate(`/recipes/${id}`)}
            >ยกเลิก</button>
          <button type="submit" className="submit-btn">บันทึก</button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;