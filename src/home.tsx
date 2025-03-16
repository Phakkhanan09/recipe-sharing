import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";

const Home = () => {
  return (
    <div 
      className="home-container" 
      style={{ 
        backgroundImage: 'url(/images/food1.jpg)',
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
      <header className="header" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
        <nav>
          <Link to="/" className="add-recipe-btn">หน้าแรก</Link>
          <Link to="/list-menu" className="add-recipe-btn2">เมนูอาหาร</Link>
        </nav>
      </header>
      <div className="welcome-container">
        <h1 className="welcome-text">ยินดีต้อนรับสู่โลกแห่งความอร่อยของ<br/>อาหารไทยไทย่ไทย้ไทย๊ไทย๋</h1>
        
      </div>
    </div>
  );
};

export default Home;
