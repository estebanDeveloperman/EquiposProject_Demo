import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ConfirmarEliminacionModal from "./ConfirmarEliminacionModal";

const DetalleEquipoModal = ({ show, onHide, equipo }) => {
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  if (!equipo) {
    return null; // o puedes renderizar un mensaje de error u otra cosa
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/equipos/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmarEliminar = () => {
    handleDelete(equipo.id);
    setConfirmarEliminar(false);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Equipo</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "auto" }}>
          <h4>{equipo.nombre}</h4>
          <p>
            <b>Marca</b>: {equipo.marca}
          </p>
          <p>
            <b>Modelo</b>: {equipo.modelo}
          </p>
          <p>
            <b>Serie</b>: {equipo.serie}
          </p>
          <p>
            <b>Etiqueta Patrimonial</b>: {equipo.etiqueta_patrimonial}
          </p>
          <p>
            <b>Ubicación</b>: {equipo.ubicacion}
          </p>
          <p>
            <b>OTM</b>: {equipo.otm}
          </p>
          <p>
            <b>Observaciones</b>: {equipo.observaciones || "-"}
          </p>
          {equipo.ultimoMantenimiento ? (
            <>
              <p>
                <b>Último Mantenimiento</b>:
                {" " +
                  format(
                    new Date(equipo.ultimoMantenimiento.fecha_mantenimiento),
                    "dd/MM/yyyy"
                  )}
              </p>
              <p>
                <b>Descripción</b>:{" "}
                {equipo.ultimoMantenimiento.descripcion || "-"}
              </p>
            </>
          ) : (
            //   <p>No hay información de mantenimiento.</p>
            <>
              <p>
                <b>Último Mantenimiento</b>: -
              </p>
              <p>
                <b>Descripción</b>: -
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="delete btn btn-danger"
            onClick={() => setConfirmarEliminar(true)}
          >
            Eliminar
          </button>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
          {/* Agrega aquí el botón de eliminación */}
        </Modal.Footer>
      </Modal>
      <ConfirmarEliminacionModal
        show={confirmarEliminar}
        onHide={() => setConfirmarEliminar(false)}
        onConfirm={handleConfirmarEliminar}
      />
    </>
  );
};

export default DetalleEquipoModal;
