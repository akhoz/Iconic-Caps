import { useUser } from "../contexts/UserContext.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";

import AddProductModal from "../components/admin/AddProductModal.jsx";
import AddStoreModal from "../components/admin/AddStoreModal.jsx";
import AddEmployeesModal from "../components/admin/AddEmployees.Modal.jsx";
import AddDelivererModal from "../components/admin/AddDelivererModal.jsx";
import AddProvidersModal from "../components/admin/AddProvidersModal.jsx";

import ModifyProductModal from "../components/admin/ModifyProductModal.jsx";
import ModifyStoreModal from "../components/admin/ModifyStoreModal.jsx";
import ModifyEmployeeModal from "../components/admin/ModifyEmployeeModal.jsx";
import ModifyDelivererModal from "../components/admin/ModifyDelivererModal.jsx";
import ModifyProvidersModal from "../components/admin/ModifyProvidersModal.jsx";

import DeleteProductModal from "../components/admin/DeleteProductModal.jsx";
import DeleteStoreModal from "../components/admin/DeleteStoreModal.jsx";
import DeleteEmployeeModal from "../components/admin/DeleteEmployeeModal.jsx";
import DeleteDelivererModal from "../components/admin/DeleteDelivererModal.jsx";
import DeleteProviderModal from "../components/admin/DeleteProviderModal.jsx";

import Dashboard from "../components/admin/Dashboard.jsx";
import PendingOrderModal from "../components/admin/ordersManagement/PendingOrderModal.jsx";

import axios from "axios";

function Admin() {
  const { user, logOut } = useUser();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  // Auth state
  const [authChecked, setAuthChecked] = useState(false);

  // UI state
  const [showFeatures, setShowFeatures] = useState(false);

  // Add modals
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddStoreModal, setShowAddStoreModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showAddDelivererModal, setShowAddDelivererModal] = useState(false);
  const [showAddProvidersModal, setShowAddProvidersModal] = useState(false);

  // Modify modals
  const [showModifyProductModal, setShowModifyProductModal] = useState(false);
  const [showModifyStoreModal, setShowModifyStoreModal] = useState(false);
  const [showModifyEmployeeModal, setShowModifyEmployeeModal] = useState(false);
  const [showModifyDelivererModal, setShowModifyDelivererModal] = useState(false);
  const [showModifyProvidersModal, setShowModifyProvidersModal] = useState(false);

  // Delete modals
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [showDeleteStoreModal, setShowDeleteStoreModal] = useState(false);
  const [showDeleteEmployeeModal, setShowDeleteEmployeeModal] = useState(false);
  const [showDeleteDelivererModal, setShowDeleteDelivererModal] = useState(false);
  const [showDeleteProvidersModal, setShowDeleteProvidersModal] = useState(false);

  // Orders
  const [showPendingOrderModal, setShowPendingOrderModal] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Verify admin access
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_URL}/api/auth/me`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });

        if (!data?.Admin) {
          navigate("/", { replace: true });
          return;
        }

        setAuthChecked(true);
      } catch (err) {
        navigate("/", { replace: true });
      }
    };

    verifyAdmin();
  }, [API_URL, navigate]);

  // Fetch pending orders
  useEffect(() => {
    const getPendingOrders = async () => {
      const res = await axios.get(`${API_URL}/consultas/pedidos-pendientes`);
      setPendingOrders(res.data);
    };

    getPendingOrders();
  }, [API_URL]);

  const handleFeatures = () => {
    setShowFeatures(!showFeatures);
    window.scrollTo({
      top: !showFeatures ? 110 : 0,
      behavior: "smooth",
    });
  };

  const handleLogOut = () => {
    logOut();
    navigate("/");
    window.location.reload();
  };

  const handleCloseModal = () => {
    setShowAddProductModal(false);
    setShowAddStoreModal(false);
    setShowAddEmployeeModal(false);
    setShowAddDelivererModal(false);
    setShowAddProvidersModal(false);

    setShowModifyProductModal(false);
    setShowModifyStoreModal(false);
    setShowModifyEmployeeModal(false);
    setShowModifyDelivererModal(false);
    setShowModifyProvidersModal(false);

    setShowDeleteProductModal(false);
    setShowDeleteStoreModal(false);
    setShowDeleteEmployeeModal(false);
    setShowDeleteDelivererModal(false);
    setShowDeleteProvidersModal(false);

    setShowPendingOrderModal(false);
  };

  const handleClickOrder = (order) => {
    setSelectedOrder(order);
    setShowPendingOrderModal(true);
  };

  if (!authChecked) return null;

  return (
    <>
      {user && (
        <div className="flex flex-col w-full items-center justify-center">
          {/* Header */}
          <div className="flex items-center justify-center bg-account bg-cover bg-no-repeat w-full h-72 relative">
            <h1 className="text-5xl text-center text-white z-10">{user.Usuario}</h1>
            <div className="absolute inset-0 bg-black opacity-70"></div>
          </div>

          {/* Display Features */}
          <div className="flex justify-center w-full py-6 bg-black text-white text-md">
            <button
              className="flex flex-row justify-center items-center duration-500 transition-transform transform hover:scale-110 space-x-2"
              onClick={handleFeatures}
            >
              <p>Display Features</p>
              {showFeatures ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
          </div>

          {/* ADMIN FEATURE LIST */}
          {showFeatures && (
            <>
              {/* Add */}
              <div className="flex flex-wrap justify-center w-full py-6 bg-black text-white gap-5">
                <button onClick={() => setShowAddProductModal(true)}>Add Products</button>
                <button onClick={() => setShowAddStoreModal(true)}>Add Stores</button>
                <button onClick={() => setShowAddEmployeeModal(true)}>Add Employees</button>
                <button onClick={() => setShowAddDelivererModal(true)}>Add Deliverers</button>
                <button onClick={() => setShowAddProvidersModal(true)}>Add Providers</button>
              </div>

              {/* Modify */}
              <div className="flex flex-wrap justify-center w-full py-6 bg-black text-white gap-5">
                <button onClick={() => setShowModifyProductModal(true)}>Modify Products</button>
                <button onClick={() => setShowModifyStoreModal(true)}>Modify Stores</button>
                <button onClick={() => setShowModifyEmployeeModal(true)}>Modify Employees</button>
                <button onClick={() => setShowModifyDelivererModal(true)}>Modify Deliverers</button>
                <button onClick={() => setShowModifyProvidersModal(true)}>Modify Providers</button>
              </div>

              {/* Delete */}
              <div className="flex flex-wrap justify-center w-full py-6 bg-black text-white gap-5">
                <button onClick={() => setShowDeleteProductModal(true)}>Delete Products</button>
                <button onClick={() => setShowDeleteStoreModal(true)}>Delete Stores</button>
                <button onClick={() => setShowDeleteEmployeeModal(true)}>Delete Employees</button>
                <button onClick={() => setShowDeleteDelivererModal(true)}>Delete Deliverers</button>
                <button onClick={() => setShowDeleteProvidersModal(true)}>Delete Providers</button>
              </div>
            </>
          )}

          <Dashboard />

          {/* Pending Orders */}
          <div className="flex-grow bg-black w-full text-white mt-20 py-20 relative">
            <h1 className="font-bold text-2xl absolute top-8 left-8">Pending Orders</h1>

            {pendingOrders.length === 0 && (
              <p className="text-lg ml-8">There are no pending orders</p>
            )}

            {pendingOrders.length > 0 && (
              <div className="flex w-full justify-center">
                <div className="grid grid-cols-1 gap-x-10 gap-y-20 mx-8 w-full md:grid-cols-2 lg:grid-cols-3">
                  {pendingOrders.map((order) => (
                    <button
                      key={order.NumeroFactura}
                      className="transition-transform transform hover:scale-105"
                      onClick={() => handleClickOrder(order)}
                    >
                      <div className="flex flex-col justify-between items-start">
                        <h2 className="font-bold text-lg">{`Order: ${order.NumeroFactura}`}</h2>
                        <p className="text-sm mt-1 text-justify">{order.FechaDeCompra}</p>
                        <p>{`User: ${order.NombreCliente}`}</p>
                        <p>{`Deliverer: ${order.NombreRepartidor}`}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global logout */}
      <button onClick={handleLogOut}>
        <IoExitOutline className="absolute left-5 top-5 text-3xl text-white hover:scale-125 transition-transform duration-300 rotate-180" />
      </button>

      {/* MODALS */}
      {showAddProductModal && (
        <Overlay>
          <AddProductModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showAddStoreModal && (
        <Overlay>
          <AddStoreModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showAddEmployeeModal && (
        <Overlay>
          <AddEmployeesModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showAddDelivererModal && (
        <Overlay>
          <AddDelivererModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showAddProvidersModal && (
        <Overlay>
          <AddProvidersModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showModifyProductModal && (
        <Overlay>
          <ModifyProductModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showModifyStoreModal && (
        <Overlay>
          <ModifyStoreModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showModifyEmployeeModal && (
        <Overlay>
          <ModifyEmployeeModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showModifyDelivererModal && (
        <Overlay>
          <ModifyDelivererModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showModifyProvidersModal && (
        <Overlay>
          <ModifyProvidersModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showDeleteProductModal && (
        <Overlay>
          <DeleteProductModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showDeleteStoreModal && (
        <Overlay>
          <DeleteStoreModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showDeleteEmployeeModal && (
        <Overlay>
          <DeleteEmployeeModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showDeleteDelivererModal && (
        <Overlay>
          <DeleteDelivererModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showDeleteProvidersModal && (
        <Overlay>
          <DeleteProviderModal handleCloseModal={handleCloseModal} />
        </Overlay>
      )}

      {showPendingOrderModal && selectedOrder && (
        <Overlay>
          <PendingOrderModal
            handleCloseModal={handleCloseModal}
            orderSelected={selectedOrder.NumeroFactura}
          />
        </Overlay>
      )}
    </>
  );
}

const Overlay = ({ children }) => (
  <>
    <div className="fixed z-50 inset-0 flex items-center justify-center overflow-y-auto">
      {children}
    </div>
    <div className="fixed inset-0 w-full h-full bg-black opacity-80 z-30"></div>
  </>
);

export default Admin;
