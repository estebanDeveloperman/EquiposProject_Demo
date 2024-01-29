import React, { useState } from "react";
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
  });

  const navigate = useNavigate();
  const location = useLocation()

  const equipoId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setEquipo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/equipos/"+equipoId, equipo);
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
        <label htmlFor="nombre"><b>Nombre</b></label>
        <input
          type="text"
          placeholder="Nombre"
          onChange={handleChange}
          name="nombre"
        />
      </div>
      <div className="input-control">
        <label htmlFor="marca"><b>Marca</b></label>
        <input
          type="text"
          placeholder="Marca"
          onChange={handleChange}
          name="marca"
        />
      </div>
      <div className="input-control">
        <label htmlFor="modelo"><b>Modelo</b></label>
        <input
          type="text"
          placeholder="Modelo"
          onChange={handleChange}
          name="modelo"
        />
      </div>
      <div className="input-control">
        <label htmlFor="serie"><b>Serie</b></label>
        <input
          type="text"
          placeholder="Serie"
          onChange={handleChange}
          name="serie"
        />
      </div>
      <div className="input-control">
        <label htmlFor="etiqueta_patrimonial"><b>Etiqueta Patrimonial</b></label>
        <input
          type="text"
          placeholder="Etiqueta patrimonial"
          onChange={handleChange}
          name="etiqueta_patrimonial"
        />
      </div>
      <div className="input-control">
        <label htmlFor="ubicacion"><b>Ubicacion</b></label>
        <input
          type="text"
          placeholder="Ubicacion"
          onChange={handleChange}
          name="ubicacion"
        />
      </div>
      <div className="input-control">
        <label htmlFor="otm"><b>OTM</b></label>
        <input
          type="text"
          placeholder="Otm"
          onChange={handleChange}
          name="otm"
        />
      </div>
      <div className="input-control">
        <label htmlFor="observaciones"><b>Observaciones</b></label>
        {/* <input
          type="text"
          placeholder="Observaciones"
          onChange={handleChange}
          name="observaciones"
        /> */}
        <textarea name="observaciones" onChange={handleChange} cols="30" rows="3" placeholder="Observaciones"></textarea>
      </div>
      <button onClick={handleClick}>Agregar</button>
    </div>
  );
};

export default Update;
