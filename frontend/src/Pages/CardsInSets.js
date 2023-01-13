import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { channels } from "../shared/constants";
import * as React from 'react';
import CardTile from "../Components/CardTile";


function CardsInSets(props) {
  const { setId } = useParams()
  const [cards, setCards] = React.useState(null);

  const setCorrectData = (arg) => {
    try {
      const { type } = arg
      switch (type) {
        case 'CardsInSet':
          console.log(arg['value'])
          setCards(arg['value'])
          break;
      
        default:
          break;
      }
    } catch (error) {
      console.log('Error receiving Data: ' + error)
    }
  }

  useEffect(() => {
    window.api.send(channels.GET_DATA, { type: 'FetchData', value: 'CardsInSet', setId: setId })
  }, [""]);

  useEffect(() => {
    window.api.receive(channels.GET_DATA, setCorrectData)
    // Clean the listener after the component is dismounted
    return () => {
      // window.api.on.removeAllListeners();
    };
  }, [window.api.on]);

  return (
    <>
      <div>
      {cards && cards.map((cards) =><div key={cards.id}><CardTile setId={setId} value={cards}/> <br/></div>)}
      </div>
    </>
  )
}

export default CardsInSets;