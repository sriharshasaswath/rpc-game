import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import {RiCloseLine} from 'react-icons/ri'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    you: '',
    opponent: '',
    isClicked: false,
    score: 0,
    text: '',
  }

  getResult = (item1, item2) => {
    if (item1.id === 'ROCK') {
      switch (item2.id) {
        case 'PAPER':
          return 'YOU LOSE'
        case 'SCISSORS':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    } else if (item1.id === 'PAPER') {
      switch (item2.id) {
        case 'ROCK':
          return 'YOU WON'
        case 'SCISSORS':
          return 'YOU LOSE'
        default:
          return 'IT IS DRAW'
      }
    } else {
      switch (item2.id) {
        case 'ROCK':
          return 'YOU LOSE'
        case 'PAPER':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    }
  }

  imageClick = id => {
    const randomNumber = Math.floor(Math.random() * choicesList.length)
    const choice2 = choicesList[randomNumber]
    this.setState({isClicked: true})
    console.log(id)
    const choice1 = choicesList.filter(eachValue => eachValue.id === id)

    const finalResult = this.getResult(choice1[0], choice2)
    console.log(finalResult)
    this.setState({you: choice1[0].imageUrl})
    this.setState({opponent: choice2.imageUrl})
    const {score} = this.state
    let newScore = score
    if (finalResult === 'YOU WON') {
      newScore = score + 1
    } else if (finalResult === 'YOU LOSE') {
      newScore = score - 1
    } else {
      newScore = score
    }
    this.setState({
      score: newScore,
      text: finalResult,
    })
  }

  restartGame = () => this.setState({isClicked: false})

  render() {
    const {isClicked, score, you, opponent, text} = this.state
    return (
      <div className="background">
        <div className="score-board">
          <div className="gamename-container">
            <p className="name">ROCK</p>
            <p className="name">PAPER</p>
            <p className="name">SCISSORS</p>
          </div>
          <button className="score-button" type="button">
            <p className="score">score</p>
            <h1 className="score-value">{score}</h1>
          </button>
        </div>

        {isClicked ? (
          <div>
            <div className="after-clicked">
              <div className="alignment1">
                <p className="you">you</p>

                <img src={you} alt="result" className="result" />
              </div>
              <div className="alignment2">
                <p className="opponent">Opponent</p>
                <img src={opponent} alt="newImageUrl" className="newImageUrl" />
              </div>
            </div>
            <div className="result-container">
              <p className="result1">
                <strong>{text}</strong>
              </p>
              <button
                type="button"
                className="playAgain"
                onClick={this.restartGame}
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        ) : (
          <div>
            <ul className="choicesList">
              {choicesList.map(each => (
                <img
                  key={each.imageUrl}
                  src={each.imageUrl}
                  className={each.id}
                  onClick={() => this.imageClick(each.id)}
                  alt="img"
                />
              ))}
            </ul>
            <div className="rules-button-alignment">
              <Popup
                modal
                trigger={
                  <button type="button" className="trigger-button">
                    RULES
                  </button>
                }
              >
                {close => (
                  <div className="PopUpView">
                    <button
                      type="button"
                      className="trigger-button-close"
                      onClick={() => close()}
                    >
                      <RiCloseLine />
                    </button>
                    <img
                      className="PopUpImage"
                      src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                      alt="rules"
                    />
                  </div>
                )}
              </Popup>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
