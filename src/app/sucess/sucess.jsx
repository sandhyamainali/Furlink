// "use client";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// export default function PaymentSuccess() {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get('order_id');

//   useEffect(() => {
//     if (orderId) {
//       confirmOrderStatus(orderId);
//     }
//   }, [orderId]);

//   const confirmOrderStatus = async (orderId) => {
//     try {
//       const response = await fetch(`${BASE_URL}/shop/orders/${orderId}/`);
//       if (response.ok) {
//         const orderData = await response.json();
//         setOrder(orderData);
//       }
//     } catch (error) {
//       console.error("Error fetching order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h1>Payment Successful! 🎉</h1>
//       {order && (
//         <div>
//           <p>Order ID: #{order.id}</p>
//           <p>Status: {order.status}</p>
//           <p>Total Amount: {order.currency} {order.total_amount}</p>
//         </div>
//       )}
//       <button onClick={() => window.location.href = "/"}>
//         Continue Shopping
//       </button>
//     </div>
//   );
// }