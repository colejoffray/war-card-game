//Get the deck
let deckId = ''
let player1Score = 0
let player2Score = 0
let warCounter = 0

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        deckId = data.deck_id
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });


document.getElementById('playNow').addEventListener('click', getFetch)
document.getElementById('restart').addEventListener('click', restart)

function restart(){
  localStorage.clear()
  location.reload()
}

function getFetch(){

  const savedDeck = localStorage.getItem('deckID')


  //this ternary operator statement basically says that if there is a deckID saved to local storage, the url will use that (means that it will save any existing game that is still in progress), and if there isnt than it must be a new game so get a new deck if
  const url = savedDeck ? `https://deckofcardsapi.com/api/deck/${savedDeck}/draw/?count=2` : `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // console.log(data)
        localStorage.setItem('Deck', JSON.stringify(data)) // this will deliver the object as a string into localStorage
        const myDeck = JSON.parse(localStorage.getItem('Deck')) //this variable sends back the object which was in the form of a string back into an object
        console.log(myDeck)

        //adding hidden class to playnow button and removing it from deal cards and gamearea
        let gameElements = Array.from(document.getElementsByClassName('hidden'))
        gameElements.forEach(x => x.classList.toggle('hidden'))

        //saving deckID to localStorage 
        localStorage.setItem('deckID', myDeck.deck_id)

        //assigning player 1 & 2 values with object in local storage
        const val1 = Number(cardValue( myDeck.cards[0].value ))
        const val2 = Number(cardValue( myDeck.cards[1].value ))

        ///DOM MANIPULATION

        //created variable from myDeck object for remaining cards and assigned that to localStorage, any dom manipulation will use remainingCardsDom
        const remainingCards = myDeck.remaining
        localStorage.setItem('remainingCards', remainingCards)
        const remainingCardsDom = localStorage.getItem('remainingCards')
        //remaining cards value 
         document.getElementById('remainingCards').innerHTML = `Cards left in deck: ${remainingCardsDom}`
      


        //
        document.querySelector('#player1').src = myDeck.cards[0].image
        document.querySelector('#player2').src = myDeck.cards[1].image



        if(val1 > val2){
          document.querySelector('h3').innerText = 'Player 1 WON!'
          player1Score += (2 + warCounter)
          localStorage.setItem('player1Score', player1Score)
          warCounter = 0

        }else if(val1 < val2){
          document.querySelector('h3').innerText = 'Player 2 WON!'
          player2Score += (2 + warCounter)
          localStorage.setItem('player2Score', player2Score)
          warCounter = 0
        }else if(val1 == val2){
          document.querySelector('h3').innerText = 'WAR!'
          warCounter += 2

        }

        let player1ScoreLS = !localStorage.getItem('player1Score') ? 0 : localStorage.getItem('player1Score')
        let player2ScoreLS = !localStorage.getItem('player2Score') ? 0 : localStorage.getItem('player2Score')


        document.getElementById('playerScores').innerHTML = `Player 1 Score: ${player1ScoreLS} | Player 2 Score: ${player2ScoreLS}`

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function cardValue(val){
  if(val === "ACE"){
    return 14
  }else if (val === "KING"){
    return 13
  }else if(val === "QUEEN"){
    return 12
  }else if(val === "JACK"){
    return 11
  }else{
    return val
  }
}

// function keepScore(){
 
  // if(document.querySelector('h3').innerHTML = 'Player 1 WON!') {
  //   player1Score += 2
  //   console.log(`Player 1's Score is ${player1Score}`)
  //   localStorage.setItem('player1Score', player1Score)
  // }else if (document.querySelector('h3').innerHTML = 'Player 2 WON!'){
  //   player2Score += 2
  //   console.log(`Player 2's Score is ${player2Score}`)
  //   localStorage.setItem('player2Score', player2Score)
  // }
