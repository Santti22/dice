import React, {useState, useEffect} from "react";
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from '../style/style';

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;
const WINNING_POINTS = 23;



export default function Gameboard() {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [nbrOfWins, setNbrOfWins] = useState(0);
    const [sum, setSum] = useState(0);
    const [status, setStatus] = useState('');
    const row = [];

    function throwDices() {
        let sum = 0;
        for (let i = 0; i < NBR_OF_DICES; i++) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = 'dice-' + randomNumber;
            sum += randomNumber;
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        setSum(sum);
    }

    function checkWinner() {
        if (sum >= WINNING_POINTS && nbrOfThrowsLeft > 0) {
            setNbrOfWins(nbrOfWins+1);
            setStatus('Stay winning!');
        }
        else if (sum >= WINNING_POINTS && nbrOfThrowsLeft === 0) {
            setNbrOfWins(nbrOfWins+1);
            setStatus('You won, game over');
        }
        else if (nbrOfWins > 0 && nbrOfThrowsLeft === 0) {
            setStatus('You won, game over');
        }
        else if (nbrOfThrowsLeft === 0) {
            setStatus('You lost, go again?');
        }
        else {
            setStatus('Keep rolling!');
        }
    }

    useEffect(() => {
        checkWinner();
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus("Game hasn't started");
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
            setNbrOfWins(0);
        }
    }, [nbrOfThrowsLeft]);

    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <MaterialCommunityIcons
            name={board[i]}
            key={"row" + i}
            size={50}
            color={'steelblue'}>
            </MaterialCommunityIcons>
        );
    }
    return(
        <View style={styles.gameboard}>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Sum: {sum}</Text>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>Nbr of wins: {nbrOfWins}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={() => throwDices()}>
                    <Text style={styles.buttonText}>
                        Throw dices
                    </Text>
                </Pressable>
        </View>
    )
}