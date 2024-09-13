import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Single = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 
    const { id } = useParams();   // Esto deberia obtener el id desde la URL
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        console.log("store.data:", store.data);  // Para verificar si los datos de los contactos están disponibles
        console.log("ID del contacto:", id);  // Quiero verificar que si estoy obteniendo el ID
    
        if (id && store.data && store.data.contacts) {
            // Asegúrate de que el ID sea comparado correctamente como string
            const contact = store.data.contacts.find(contact => contact.id.toString() === id.toString()); 
            console.log("Contacto encontrado:", contact);  // Verifica si se encuentra el contacto
    
            if (contact) {
                setFormData({
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone,
                    address: contact.address
                });
            } else {
                console.error("Contacto no encontrado");
            }
        }
    }, [id, store.data]);
    
    
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("handleSubmit se ha ejecutado");  // Solo para verificar que funciona
    
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            alert("Please fill all the fields.");
            return;
        }
    
        if (id) {
            console.log("Editando contacto con ID:", id);  // Verificar si el ID esta ahí
            await actions.editSomeData(id, formData);
        } else {
            console.log("Creando un nuevo contacto");
            await actions.postSomeData(formData);
        }
    
        navigate("/"); // Volver al Home
    };
    
    
    

    return (
        <div className="container mt-4"> {/* Añade un contenedor y márgenes superiores */}
          <form onSubmit={handleSubmit} className="border p-4 rounded shadow"> {/* Añade bordes, padding, esquinas redondeadas y sombra */}
            <h1 className="text-center mb-4">{id ? "Edit Contact" : "Add a new contact"}</h1>
      
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>
      
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
      
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
              />
            </div>
      
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
              />
            </div>
      
            <div className="d-flex justify-content-between align-items-center"> {/* Alinea los botones */}
              <button type="submit" className="btn btn-primary">Save</button>
              <Link to="/">
                <span role="button" className="text-decoration-none">or get back to contacts</span> {/* Elimina el subrayado del enlace */}
              </Link>
            </div>
          </form>
        </div>
      );
};
