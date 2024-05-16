import Stores from '../components/Stores.jsx';
import {useEffect, useState} from "react";
import axios from "axios";

function LocalStores() {
    const employeesUri = "http://localhost:8000/empleados";
    const storesUri = "http://localhost:8000/sucursales";
    let storeCount = 1;

    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        getEmployees();
    });

    const [stores, setStores] = useState([]);
    useEffect(() => {
        getStores();
    });

    const getEmployees = async () => {
        const res = await axios.get(employeesUri);
        setEmployees(res.data);
    }

    const getStores = async () => {
        const res = await axios.get(storesUri);
        setStores(res.data);
    }

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold text-center mb-5">
                Our Stores
            </h1>
            <p className="text-center mb-6 md:text-xl ml:text-xl">
                We have stores in different cities. Visit us!
            </p>
            {stores.map(store => (
                <Stores
                    key={store.id}
                    storeIndex={storeCount++}
                    imgSrc={`/img/local-ny.webp`}
                    name={store.Nombre}
                    description={store.Direccion}
                    phone={store.NumeroTelefono}
                    employees={employees
                        .filter(employee => employee.NumeroSucursalAsignada === store.NumeroSucursal)
                        .map(employee => employee.Persona.Nombre + ' ' + employee.Persona.PrimerApellido + ' ' + employee.Persona.SegundoApellido)
                    }
                />
            ))}
            </div>
    );
}

export default LocalStores;
