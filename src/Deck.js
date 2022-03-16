import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Card from './Card'

const API_BASE_URL = "http://deckofcardsapi.com/api/deck"

const Deck = () => {
  const [deck, setDeck] = useState('')
  const [cards, setCards] = useState([])
  const [endOfDeck, setEndOfDeck] = useState(false)

  useEffect(() => {
    async function fetchAndSetDeck() {
      const deckResult = await axios.get(`${API_BASE_URL}/new/shuffle/`)
      setDeck(deckResult.data)
    }
    fetchAndSetDeck()
  }, []) 


  async function getCard() {
    let {deck_id: deckId} = deck
    
    try {
      let drawResults = await axios.get(`${API_BASE_URL}/${deckId}/draw/?count=1`)
      const {remaining, cards} = drawResults.data

      if (remaining === 0) {
        setEndOfDeck(true)
        throw new Error("End of Deck")
      }

      const {code, value, suit} = cards[0]

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

  const handleClick = () => {
    getCard()
  }
  
  const cardComponents =  
    cards.map(({id, name}) => (<Card id={id} name={name} key={id}/>))
  
  return (
    <>
      {!endOfDeck ? 
        <button onClick={handleClick}>Draw Card</button> : null}
      <div>{cardComponents}</div>
    </>
  )
}

export default Deck