import React from "react"
import Confetti from 'react-confetti'

const Game = () => {
    
    function getInitialDiceArray()
    {
        let initialDiceArray = [];
        for(let i = 0; i < 10; i++)
        {
            initialDiceArray.push({
                id: i,
                value: getRandomNumber(),
                selected: false
            });
        }
        return initialDiceArray;
    }

    let [diceArray, setDiceArray] = React.useState(getInitialDiceArray);

    let [rollButton, setRollButton] = React.useState(true);

    React.useEffect(() => {
        let matchedValue = diceArray[0].value;
        if(diceArray.every((dice) => (dice.selected === true && dice.value === matchedValue)))   // if all the dies are selected and they match the first dice's value, we set the button to showcase "Reset Again"
        {
            setRollButton(false);
        }
        else
        {
            setRollButton(true);   // if we find a dice not matching the first dice's value, we set the button to showcase "Roll"
        }
    }, [diceArray]);

    function getRandomNumber()
    {
        return Math.floor((Math.random() * 6) + 1);   // generate random numbers between 1 to 6
    }

    function rollOn()
    {
        setDiceArray((prevDiceArray) => {
            return prevDiceArray.map((oldDice) => {
                if(oldDice.selected === true)
                {
                    return oldDice;
                }
                else if(oldDice.selected === false)
                {
                    return {
                        ...oldDice,
                        value: getRandomNumber()
                    }
                }
            });
        });
    }

    function toggleSelect(event, diceId)
    {
        setDiceArray((prevDiceArray) => {
            return (
                prevDiceArray.map((dice) => {
                    if(dice.id === diceId)
                    {
                        return {
                            ...dice,
                            selected: !(dice.selected)
                        };
                    }
                    else
                    {
                        return dice;
                    }
            }));
        });
    }

    let diceArrayElements = diceArray.map((dice) => {
        return (
            <div 
                className = {`dice-${dice.selected ? "green" : "white"}`}
                key = {dice.id}
                onClick = {(event) => {toggleSelect(event, dice.id)}}
            >
                {dice.value}
            </div>
        );
    });

    console.log(diceArray);

    return (
        <section>
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-container">
                {diceArrayElements}
            </div>
            {(rollButton) ? (<button onClick = {rollOn}>Roll</button>) 
                : (<>
                        <button onClick = {() => setDiceArray(getInitialDiceArray)}>
                            Restart Game
                        </button>
                        <Confetti />
                    </>
                )}
        </section>
    );
}

export default Game;