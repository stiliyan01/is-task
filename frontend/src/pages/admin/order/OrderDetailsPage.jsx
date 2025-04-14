import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import BackButton from "../../../components/BackButton";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        const response = await api.get(`orders/${id}`);
        const orderData = response.data;

        setOrder(orderData);
      } catch (error) {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div className="p-6">Зареждане...</div>;
  if (!order)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Поръчката не е намерена.
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-gray-50 rounded-xl">
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Детайли за поръчка #{id}</h1>
        <BackButton />
      </div>
      <div className="bg-white shadow-md rounded-xl p-4 space-y-2 border border-gray-200">
        <p>
          <span className="font-semibold text-gray-700">Име:</span> {order.name}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Email:</span>{" "}
          {order.email}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Телефон:</span>{" "}
          {order.phone}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Адрес:</span>{" "}
          {order.address}
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
        <h2 className="text-lg font-semibold  mb-2">Продукти</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border border-gray-200">Име</th>
              <th className="p-2 border border-gray-200">Количество</th>
              <th className="p-2 border border-gray-200">Цена</th>
              <th className="p-2 border border-gray-200">Общо</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-2 border border-gray-100">{product.name}</td>
                <td className="p-2 border border-gray-100">
                  {product.quantity}
                </td>
                <td className="p-2 border border-gray-100">
                  {Number(product.price).toFixed(2)} лв.
                </td>
                <td className="p-2 border border-gray-100">
                  {Number(product.price * product.quantity).toFixed(2)} лв.
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right text-xl font-bold ">
        Общо: {Number(order.total).toFixed(2)} лв.
      </div>
    </div>
  );
};

export default OrderDetailsPage;
