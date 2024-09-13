import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa'; 

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [selectedContactId, setSelectedContactId] = useState(null);

    useEffect(() => {
        actions.loadSomeData();
    }, []);

    const imagenContacto = "https://img.freepik.com/vector-gratis/ilustracion-icono-avatar-usuario_53876-5907.jpg?t=st=1726117299~exp=1726120899~hmac=de884d90f70854dfda43f1fe71a72a97871c06c2b1063fb995b81eaee97d6203&w=740";
    
    const handleDelete = async () => {
        console.log("ID del contacto seleccionado para eliminar:", selectedContactId); //Puse el console.log para saber que el boton funciona
        if (selectedContactId) {
            await actions.deleteSomeData(selectedContactId);
            setSelectedContactId(null);  // Reinicia el estado (funcionó al fiiiin!)
        }
    };

    return (
        <div className="container mt-5">
            {store.data && store.data.contacts ? (
                <div className="d-flex flex-column align-items-center">
                    {store.data.contacts.map((contact, index) => (
                        <div key={index} className="mb-3" style={{ width: "600px" }}>
                            <div className="card">
                                <div className="card-body d-flex align-items-center">
                                    <img 
                                        src={imagenContacto}
                                        className="rounded-circle me-3"
                                        alt="Imagen de contacto"
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                    <div>
                                        <p><FaUser className="me-2" /> {contact.name}</p>
                                        <p><FaEnvelope className="me-2" /> {contact.email}</p>
                                        <p><FaPhone className="me-2" /> {contact.phone}</p>
                                        <p><FaMapMarkerAlt className="me-2" /> {contact.address}</p>
                                    </div>
                                    <div className="ms-auto">
                                        <Link to={`/single/${contact.id}`}>
                                            <button className="btn btn-sm btn-warning me-2">
                                                <FaEdit />
                                            </button>
                                        </Link>
										<button 
											className="btn btn-sm btn-danger" 
											data-bs-toggle="modal" 
											data-bs-target="#exampleModal"
											onClick={() => {
												console.log("Contacto seleccionado para eliminar:", contact.id);
												setSelectedContactId(contact.id);
											}}
										>
											<FaTrash />
										</button>
                                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        If you delete this thing the entire universe will go down!
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Oh no!</button>
                                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>Yes Baby!</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Cargando...</p>
            )}
            <div className="position-absolute top-0 end-0 mt-3 me-3">
                <Link to={`/single/`}>
                    <button className="btn btn-success" type="button">Agregar Contacto</button>
                </Link>
            </div>
        </div>
    );
};