import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("latest"); 

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/orders/all`);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error("Failed to load orders.");
      }
    } catch (error) {
      console.log("Error while fetching orders: ", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">All Orders</h2>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="latest">Sort by Latest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : sortedOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {sortedOrders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 bg-white rounded-xl shadow-md p-5"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">
                    User: {order.user?.name || "N/A"} | {order.user?.email || "N/A"}
                  </p>
                  <p className="text-sm text-gray-400">
                    Placed on: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Status: {order.status}</p>
                  <p className="text-lg font-bold">{currency(order.totalAmount)}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-4">
                      {item.product?.image?.[0] && (
                        <img
                          src={item.product.image[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.product?.name || "Product Deleted"}</p>
                        <p className="text-sm text-gray-600">
                          Size: {item.size || "N/A"} | Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
