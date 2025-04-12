import React, { useState, useEffect } from "react";
import api from "../../../api";
import Table from "../../../components/admin/Table";
import { Link, useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        let response;
        if (user.is_admin === 0) {
          response = await api.get("/orders");
        } else if (user.is_admin === 1) {
          response = await api.get("/admin/orders");
        }
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Сигурни ли сте, че искате да изтриете тази поръчка?"
    );
    if (confirmDelete) {
      api.delete(`/orders/${id}`).then(() => {
        setOrders((prevOrders) =>
          prevOrders.filter((orders) => orders.id !== id)
        );
        navigate("/admin/orders");
      });
    }
  };

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Име" },
    { key: "email", label: "Емайл" },
    { key: "address", label: "Адрес" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Поръчка</h1>
      </div>

      <Table
        data={orders}
        onDelete={handleDelete}
        columns={columns}
        textForLink="orders"
        isForDetails={true}
      />
    </div>
  );
};

export default OrderPage;
