import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Card from './Card'

const Deck = () => {
  const BASE_URL = 'http://deckofcardsapi.com/api/deck'

  const [deck, setDeck] = useState(null)
  const [cards, setCards] = useState([])
  const timerId = useRef()
  const [timedDraw, setTimedDraw] = useState(false)

  useEffect(() => {
    async function fetchAndSetDeck() {
      const deckResult = await axios.get(`${BASE_URL}/new/shuffle`)
      setDeck(deckResult.data)
    }
    fetchAndSetDeck()
  }, [])

  useEffect(() => {
    async function getCard() {
      const {deck_id: deckId} = deck
      
      try {
        let drawResults = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`)
        const {remaining} = drawResults.data

        if (remaining === 0) {
          setTimedDraw(true)
          throw new Error("End of Deck")
        }
        
        const {code, value, suit} = drawResults.data.cards[0]
        setCards(data => [
          {
            id: code,
            name: `${value} of ${suit}`
          }
        ])
      } catch(error) {
        alert(error)
      }
    }

    if (timedDraw && !timerId.current) {
      timerId.current = setInterval(async () => {
        await getCard()
      }, 1000)
    }

    return () => {
      clearInterval(timerId.current)
      timerId.current = null
    }
  }, [timedDraw])

  const toggleTimedDraw = () => {
    setTimedDraw(timedDraw => !timedDraw)
  }
    
  const cardComponents =  
    cards.map(({id, name}) => (<Card id={id} key={id} name={name}/>))
  
  return (
    <>
      <button onClick={toggleTimedDraw}>{timedDraw ? 'Stop' : 'Start'}</button>
      <div>{cardComponents}</div>
    </>
  )
}

export default Deck