import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import api, { commentaryEventResource, eventsResource } from "../../Services/Service";
import Table from "./Table/TableDeEv";
import { UserContext } from "../../context/AuthContext";
import {Link, useParams} from "react-router-dom";
import { dateFormatDbToView } from "../../Utils/stringFunctions";


const DetalhesEventoPage = () => {

    const [showSpinner, setShowSpinner] = useState(false);

    // Use o hook useParams para obter o ID da URL
    const { id } = useParams();
    const { userData } = useContext(UserContext);

    const [eventos, setEventos] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [idEvento, setIdEvento] = useState(id);
    const [nomeEvento, setNomeEvento] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataEvento, setDataEvento] = useState("");

    async function loadEvents() {
        setShowSpinner(true)

        try {
            const promise = await api.get(eventsResource + `/${idEvento}`)
            setDescricao(promise.data.descricao);
            setNomeEvento(promise.data.nomeEvento);
            setDataEvento(promise.data.dataEvento)
        } catch (error) {
            
        }
        setShowSpinner(false)
    }

    async function loadComentarios() {
        setShowSpinner(true)

        try {
            const promiseAll = await api.get(commentaryEventResource + `?id=${id}`);
            const promise = await api.get(commentaryEventResource + `/ListarSomenteExibe?id=${id}`);

            console.log(userData.role);

            //setComentarios(promiseAll.data)
            setComentarios(userData.role === "Adm" ? promiseAll.data : promise.data);
        } catch (error) {         
        }
        setShowSpinner(false);
    }

    useEffect(() => {
        loadComentarios();
        loadEvents();
    },[userData])

    return (
        <>
        <MainContent>
            <Container>
                <Title titleText={"Detalhes"} additionalClass="custom-title" />
                <br />

                <p>
                    Título do evento: <span> {nomeEvento}</span>
                </p>

                <p>
                    Descrição: {descricao}
                </p>

                <p>
                    Data: {dateFormatDbToView(dataEvento)}
                </p>

                <div className="container__detalhes">

                    <Table
                        dados={comentarios}
                        idEvento={idEvento} />

                </div>
            </Container>


        </MainContent>
        
        </>
    )
};

export default DetalhesEventoPage;