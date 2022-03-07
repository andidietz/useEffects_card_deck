import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Card from './Card'
import Button from './Button'

const Deck = () => {
  const API_BASE_URL = "http://deckofcardsapi.com/api/deck"

  const [deck, setDeck] = useState('')
  const [cards, setCards] = useState([])
  const [endOfDeck, setEndOfDeck] = useState(false)

  useEffect(() => {
    async function fetchAndSetDeck() {
      const deckResult = await axios.get(`${API_BASE_URL}/new/shuffle/`)
      console.log(deckResult.data)
      setDeck(deckResult.data)
      console.log('deck', deck)

    }
    fetchAndSetDeck()
  }, [setDeck]) 

  useEffect(() => {
    async function getCard() {
      let {deck_id} = deck
      
      try {
        let drawResults = await axios.get(`${API_BASE_URL}/${deck_id}/draw/?count=1`)
        
        const {remaining, cards} = drawResults.data

        if (remaining === 0) {
          setEndOfDeck(true)
          throw new Error("End of Deck")
        }

        const {code, value, suit} = cards[0]

        setCards(data => [
          ...data,
          {
            id: code,
            name: `${value} of ${suit}`
          }
        ])
      } catch(error) {
        alert(error)
      }
    }
    getCard()
  }, [setCards])

  const handleClick = () => {
    setCards()
  }
  
  const cardComponents =  
    cards.map(({id, name}) => (<Card id={id} name={name}/>))
  
  return (
    <>
      {!endOfDeck ? 
        <Button onClick={handleClick} label='Draw Card' /> : null}
      <div>{cardComponents}</div>
    </>
  )
}


export default Deck