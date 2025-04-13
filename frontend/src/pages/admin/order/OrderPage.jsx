import React, { useState, useEffect } from "react";
import api from "../../../api";
import Table from "../../../components/admin/Table";
import { useNavigate, useLocation } from "react-router-dom";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = sessionStorage.getItem("user");
        if (!userData) return;

        const user = JSON.parse(userData);
        const isAdmin = String(user?.is_admin) === "1";
        const isUserPage = location.pathname.includes("/profile");

        let response;

        if (isAdmin && !isUserPage) {
          response = await api.get("/admin/orders"); // админ гледа всички
        } else {
          response = await api.get("/orders"); // юзър вижда само своите
        }

        setOrders(response.data);
      } catch (error) {
        console.error("Грешка при зареждане на поръчките:", error);
      }
    };

    fetchOrders();
  }, [location.pathname]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Сигурни ли сте, че искате да изтриете тази поръчка?"
    );
    if (confirmDelete) {
      api.delete(`/orders/${id}`).then(() => {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== id)
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
        <h1 className="text-2xl font-bold">Поръчки</h1>
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
