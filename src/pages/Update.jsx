import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [equipo, setEquipo] = useState({
    nombre: "",
    marca: "",
    modelo: "",
    serie: "",
    etiqueta_patrimonial: "",
    ubicacion: "",
    otm: "",
    observaciones: "",
    fecha_mantenimiento: "", // Nuevo campo para la fecha de mantenimiento
    descripcion_mantenimiento: "", // Nuevo campo para la descripción de mantenimiento
  });

  const navigate = useNavigate();
  const location = useLocation();

  const equipoId = location.pathname.split("/")[2];

  useEffect(() => {
    const esId = (id) => {
      return id.id === Number(equipoId);
    };

    const fetachAllEquipos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/equipos");
        setEquipo(res.data.find(esId));
      } catch (err) {
        console.log(err);
      }
    };

    const fetchMantenimiento = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/equipos/${equipoId}/mantenimiento`
        );
        const ultimaMantenimiento = res.data[0]; // Suponiendo que los resultados están ordenados por fecha descendente

        const fechaMantenimientoFormateada = new Date(ultimaMantenimiento.fecha_mantenimiento).toISOString().split('T')[0];
        console.log(fechaMantenimientoFormateada)
        setEquipo((prev) => ({
          ...prev,
          fecha_mantenimiento: fechaMantenimientoFormateada,
          descripcion_mantenimiento: ultimaMantenimiento.descripcion,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    fetachAllEquipos();
    fetchMantenimiento();
  }, [equipoId]);

  const handleChange = (e) => {
    setEquipo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/equipos/" + equipoId, equipo);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(equipo);
  return (
    <div className="form" id="form">
      <h1>Editar el Equipo</h1>

      <div className="input-control">
        <label htmlFor="nombre">
          <b>Nombre</b>
        </label>
        <input
          type="text"
          placeholder="Nombre"
          onChange={handleChange}
          name="nombre"
          value={equipo.nombre}
        />
      </div>
      <div className="input-control">
        <label htmlFor="marca">
          <b>Marca</b>
        </label>
        <input
          type="text"
          placeholder="Marca"
          onChange={handleChange}
          name="marca"
          value={equipo.marca}
        />
      </div>
      <div className="input-control">
        <label htmlFor="modelo">
          <b>Modelo</b>
        </label>
        <input
          type="text"
          placeholder="Modelo"
          onChange={handleChange}
          name="modelo"
          value={equipo.modelo}
        />
      </div>
      <div className="input-control">
        <label htmlFor="serie">
          <b>Serie</b>
        </label>
        <input
          type="text"
          placeholder="Serie"
          onChange={handleChange}
          name="serie"
          value={equipo.serie}
        />
      </div>
      <div className="input-control">
        <label htmlFor="etiqueta_patrimonial">
          <b>Etiqueta Patrimonial</b>
        </label>
        <input
          type="text"
          placeholder="Etiqueta patrimonial"
          onChange={handleChange}
          name="etiqueta_patrimonial"
          value={equipo.etiqueta_patrimonial}
        />
      </div>
      <div className="input-control">
        <label htmlFor="ubicacion">
          <b>Ubicacion</b>
        </label>
        <input
          type="text"
          placeholder="Ubicacion"
          onChange={handleChange}
          name="ubicacion"
          value={equipo.ubicacion}
        />
      </div>
      <div className="input-control">
        <label htmlFor="otm">
          <b>OTM</b>
        </label>
        <input
          type="text"
          placeholder="Otm"
          onChange={handleChange}
          name="otm"
          value={equipo.otm}
        />
      </div>
      <div className="input-control">
        <label htmlFor="observaciones">
          <b>Observaciones</b>
        </label>
        {/* <input
          type="text"
          placeholder="Observaciones"
          onChange={handleChange}
          name="observaciones"
        /> */}
        <textarea
          name="observaciones"
          onChange={handleChange}
          cols="30"
          rows="3"
          placeholder="Observaciones"
          value={equipo.observaciones}
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="fecha_mantenimiento">
          <b>Fecha de Mantenimiento</b>
        </label>
        <input
          type="date"
          onChange={handleChange}
          name="fecha_mantenimiento"
          value={equipo.fecha_mantenimiento}
        />
      </div>
      <div className="input-control">
        <label htmlFor="descripcion_mantenimiento">
          <b>Descripción de Mantenimiento</b>
        </label>
        <textarea
          name="descripcion_mantenimiento"
          onChange={handleChange}
          cols="30"
          rows="3"
          placeholder="Descripción de Mantenimiento"
          value={equipo.descripcion_mantenimiento}
        ></textarea>
      </div>
      <button onClick={handleClick}>Editar</button>
    </div>
  );
};

export default Update;
