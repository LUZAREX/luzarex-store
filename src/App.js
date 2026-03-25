import React, { useState } from "react";

const Button = ({ children, ...props }) => (
  <button {...props} style={{ padding: "10px", cursor: "pointer", borderRadius: "8px", border: "none" }}>
    {children}
  </button>
);

const products = [
  { id: 1, name: "Royal Oud", price: 1999, image: "https://images.unsplash.com/photo-1585386959984-a4155223161c" },
  { id: 2, name: "Midnight Rose", price: 1499, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539" },
  { id: 3, name: "Ocean Breeze", price: 1299, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb" },
  { id: 4, name: "Amber Noir", price: 1799, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd" },
  { id: 5, name: "Velvet Musk", price: 1599, image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58" },
  { id: 6, name: "Golden Essence", price: 2199, image: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f" },
  { id: 7, name: "Crystal Bloom", price: 1399, image: "https://images.unsplash.com/photo-1615634262417-0b3d8f4d4d63" },
  { id: 8, name: "Night Elixir", price: 1899, image: "https://images.unsplash.com/photo-1600180758895-3d1a7b6fdb3b" },
  { id: 9, name: "Sandal Whisper", price: 1699, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f" }
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (p) => setCart([...cart, p]);
  const removeFromCart = (i) => {
    const c = [...cart];
    c.splice(i, 1);
    setCart(c);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: total * 100,
      currency: "INR",
      name: "LUZAREX",
      description: "Premium Perfume Purchase",
      handler: function (response) {
        alert("Payment Successful: " + response.razorpay_payment_id);
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ background: "#0f172a", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>LUZAREX</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "20px" }}>
        {products.map(p => (
          <div key={p.id} style={{ background: "#1e293b", padding: "15px", borderRadius: "12px" }}>
            <img src={p.image} alt={p.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <Button onClick={() => addToCart(p)}>Add to Cart</Button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px", background: "#1e293b", padding: "20px", borderRadius: "12px" }}>
        <h2>Cart</h2>
        {cart.map((item, i) => (
          <div key={i}>
            {item.name} - ₹{item.price}
            <button onClick={() => removeFromCart(i)}>❌</button>
          </div>
        ))}
        <h3>Total: ₹{total}</h3>
        <Button onClick={handlePayment}>Pay Now</Button>
      </div>
    </div>
  );
}