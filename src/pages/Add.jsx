import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
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

  const handleChange = (e) => {
    setEquipo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("http://localhost:8800/equipos", equipo);
      await axios.post("https://equipoprojectbackend-production.up.railway.app/equipos", equipo);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(equipo);
  return (
    <div className="form" id="form">
      <h1>Agregar Nuevo Equipo</h1>

      <div className="input-control">
        <label htmlFor="nombre">
          <b>Nombre</b>
        </label>
        <input
          type="text"
          placeholder="Nombre"
          onChange={handleChange}
          name="nombre"
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
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="fecha_mantenimiento">
          <b>Fecha de Mantenimiento</b>
        </label>
        <input type="date" onChange={handleChange} name="fecha_mantenimiento" />
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
        ></textarea>
      </div>
      <button onClick={handleClick}>Agregar</button>
    </div>
  );
};

export default Add;
