import React, { useEffect, useState } from "react";
import "./HomePage.css";

import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import api, { eventsResource } from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import { nextEventResource } from "../../Services/Service";


const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState(); //Componente Notification
  const [allEvents, setAllEvents] = useState([]);

  function dataExpirada(dataEvento1) {
    const dataAtual = new Date();
    const dataEvento = new Date(dataEvento1)

    return dataEvento <= dataAtual
  }

  async function getAllEvents() {
    try {
      const promise = await api.get(eventsResource);

      setAllEvents(promise.data)
      
    } catch (error) {
      console.log("erro");
    }
  }

  // roda somente na inicialização do componente
  useEffect(() => {
    async function getNextEvents() {
      try {
        const promise = await api.get(nextEventResource);
        const dados = await promise.data;
        // console.log(dados);
        setNextEvents(dados); //atualiza o state

      } catch (error) {
        console.log("não trouxe os próximos eventos, verifique lá!");
        // setNotifyUser({
        //   titleNote: "Erro",
        //   textNote: `Não foi possível carregar os próximos eventos. Verifique a sua conexão com a internet`,
        //   imgIcon: "danger",
        //   imgAlt:
        //   "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        //   showMessage: true,
        // });
      }
    }

    getNextEvents(); //chama a função
    getAllEvents();
  }, []);

  return (
    
    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />

          <div className="events-box">
            {nextEvents.map((e) => {
              return (
                <NextEvent
                  key={e.idEvento}
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvent={e.idEvento}
                />

              );
            })}
          </div>
          <Title titleText={"Eventos Passados"} />

          <div className="events-box">
            {allEvents.map((e) => {
              const eventosExpirados = dataExpirada(e.dataEvento)

              if (eventosExpirados) {
                return (
                  <NextEvent
                    key={e.idEvento}
                    title={e.nomeEvento}
                    description={e.descricao}
                    eventDate={e.dataEvento}
                    idEvent={e.idEvento}
                    classAdd={eventosExpirados}
                  />
  
                );
              }
              return null;
             
            })}
          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
