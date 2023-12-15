import React, { useContext } from "react";
import "./NextEvent.css";
import {Link, useParams} from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

import { Tooltip } from "react-tooltip";

// importar a função lá do arquivo stringFunction (destructuring)
import { dateFormatDbToView } from "../../Utils/stringFunctions";

const NextEvent = ({ title, description, eventDate, idEvent, classAdd = false }) => {
 
  const {userData} = useContext(UserContext);

  function conectar(idEvent) {
    // dá pra usar a prop idEvent? testar
   if (!classAdd) {
     alert(`Chamar o recurso para conectar: ${idEvent}`);   
     return; 
   }
  }
  return (
    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>

      <p
        className="event-card__description"
        
        data-tooltip-id={idEvent}
        data-tooltip-content={description}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvent} className="tooltip" />
        {description.substr(0, 15)} ...
      </p>

      <p className="event-card__description">
        {/* aplicar a função pra converter a data */}
        {dateFormatDbToView(eventDate)}
      </p>

      <Link to={classAdd ? `/detalhes-evento/${idEvent}` : (userData.role === "Comum" ? `/eventos-aluno` : `/eventos`)} onClick={() => {
          conectar(idEvent)}} className="event-card__connect-link">{classAdd ? "Detalhes" : "Conectar"}</Link>

      {/* <a
        onClick={() => {
          conectar(idEvent);
        }}
        className="event-card__connect-link"
      >
        Conectar
      </a> */}
    </article>
  );
};

export default NextEvent;
