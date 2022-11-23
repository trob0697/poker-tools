import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button } from "react-bootstrap";

import { Player } from "../../utils/models";

import PlayerModal from "./playerModal";
import Board from "./board";

function EquityCalculator(): React.ReactElement {
    const navigate = useNavigate();

    const [players, setPlayers] = useState<Player[]>([new Player(), new Player()]);
    const [currentPlayer, setCurrentPlayer] = useState<number>(0);
    const [currentPlayerModal, setCurrentPlayerModal] = useState<string>("None");
    const [communityCards, setCommunityCards] = useState<string[]>([]);
    const [isCalcEnabled, setIsCalcEnabled] = useState<boolean>(false);

    useEffect(() => {
        // const accessToken: string | null = localStorage.getItem("accessToken");
        // const refreshToken: string | null = localStorage.getItem("refreshToken");
        // if (accessToken === null && refreshToken === null) {
        //     alert("Unauthorized");
        //     navigate("/home");
        // }
    });

    useEffect(() => {
        let enabled = true;
        if (communityCards.length > 0 && communityCards.length < 3) {
            enabled = false;
        }
        const dealtCards = new Set();
        communityCards.forEach((card) => { dealtCards.add(card); });
        players.forEach((player) => {
            if (player.val === "Empty..." || (player.val.length === 4 && (dealtCards.has(player.val.substring(0, 2)) || dealtCards.has(player.val.substring(2))))) {
                enabled = false;
            } else if (player.val.length === 4) {
                dealtCards.add(player.val.substring(0, 2));
                dealtCards.add(player.val.substring(2));
            }
        });
        setIsCalcEnabled(enabled);
    }, [players, communityCards]);

    function addPlayer(): void {
        const tempPlayers = [...players];
        tempPlayers.push(new Player());
        tempPlayers.forEach((p) => { p.equity = "??.?%"; });
        setPlayers(tempPlayers);
    }

    function removePlayer(): void {
        const tempPlayers = [...players];
        tempPlayers.pop();
        tempPlayers.forEach((p) => { p.equity = "??.?%"; });
        setPlayers(tempPlayers);
        setCurrentPlayer(0);
    }

    function removePlayerAtIndex(index: number): void {
        const tempPlayers = [...players];
        tempPlayers.splice(index, 1);
        tempPlayers.forEach((p) => { p.equity = "??.?%"; });
        setPlayers(tempPlayers);
        setCurrentPlayer(0);
    }

    function resetEquities(): void {
        const tempPlayers = [...players];
        tempPlayers.forEach((p) => { p.equity = "??.?%"; });
        setPlayers(tempPlayers);
    }

    function updatePlayer(val: string): void {
        const tempPlayers = [...players];
        tempPlayers[currentPlayer].val = val;
        tempPlayers.forEach((p) => { p.equity = "??.?%"; });
        setPlayers(tempPlayers);
    }

    function calculateEquity(): void {
        alert("Feature Not Implemented");
    }

    return (
        <div className="eq-calc-container">
            <div>
                <ButtonGroup style={{ margin: "1em" }}>
                    <Button variant="secondary" disabled={players.length <= 2} onClick={() => removePlayer()}>-</Button>
                    <Button className="btn-inactive" variant="secondary">{players.length} Players</Button>
                    <Button variant="secondary" disabled={players.length >= 6} onClick={() => addPlayer()}>+</Button>
                </ButtonGroup>
            </div>
            <div style={{ margin: "1em" }}>
                {players.map((player, i) => {
                    return (
                        <ButtonGroup className="player-bar" key={i}>
                            <Button className="player-bar-btn" variant="outline-danger" disabled={players.length <= 2} onClick={() => removePlayerAtIndex(i)}>&times;</Button>
                            <Button className="player-bar-btn" variant="secondary" onClick={() => { setCurrentPlayer(i); setCurrentPlayerModal("Hand"); }}>Hand</Button>
                            <Button className="player-bar-btn" variant="secondary" onClick={() => { setCurrentPlayer(i); setCurrentPlayerModal("Range"); }}>Range</Button>
                            <Button className="player-bar-range btn-inactive" variant="light">{player.val}</Button>
                            <Button className="player-bar-btn btn-inactive player-bar-calc-vals" variant="secondary">
                                <div>Equity</div>
                                <div>{player.equity}</div>
                            </Button>
                        </ButtonGroup>
                    );
                })};
                <PlayerModal player={players[currentPlayer]} updatePlayer={(payload: string) => updatePlayer(payload)} currentPlayerModal={currentPlayerModal} setCurrentPlayerModal={setCurrentPlayerModal}/>
            </div>
            <Board communityCards={communityCards} setCommunityCards={(payload: string[]) => { resetEquities(); setCommunityCards(payload); }}/>
            <Button disabled={!isCalcEnabled} variant="success" style={{ margin: "1em" }} onClick={() => calculateEquity()}>Calculate</Button>
        </div>

    );
}

export default EquityCalculator;
