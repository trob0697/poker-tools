import React, { useEffect, useState, MouseEvent } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

import { Player, Cards, CardsValue, Hands } from "../../utils/models";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const prange = require("prange");

interface PlayerModalProps {
    player: Player
    updatePlayer: Function
    currentPlayerModal: string
    setCurrentPlayerModal: Function
}

function PlayerModal(props: PlayerModalProps): React.ReactElement {
    return (
        <div>
            <HandModal player={props.player} updatePlayer={props.updatePlayer} currentPlayerModal={props.currentPlayerModal} setCurrentPlayerModal={props.setCurrentPlayerModal}/>
            <RangeModal player={props.player} updatePlayer={props.updatePlayer} currentPlayerModal={props.currentPlayerModal} setCurrentPlayerModal={props.setCurrentPlayerModal}/>
        </div>
    );
}

function HandModal(props: PlayerModalProps): React.ReactElement {
    const [handMatrix, setHandMatrix] = useState<boolean[][]>(Array.from(Array(4), () => Array(13).fill(false)));
    const [cardCount, setCardCount] = useState<number>(0);

    useEffect(() => {
        setHandMatrix(props.player.handMatrix);
        let counter = 0;
        handMatrix.forEach((row) => {
            row.forEach((col) => {
                if (col) counter += 1;
            });
        });
        setCardCount(counter);
    }, [handMatrix, props.player]);

    function onClickCard(i: number, j: number): void {
        const tempHandMatrix = [...handMatrix];
        if (handMatrix[i][j]) {
            tempHandMatrix[i][j] = false;
            setCardCount(cardCount - 1);
        } else if (!handMatrix[i][j] && cardCount < 2) {
            tempHandMatrix[i][j] = true;
            setCardCount(cardCount + 1);
        }
        setHandMatrix(tempHandMatrix);
    }

    function submitHand(): void {
        let cards = "";
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 4; j++) {
                if (handMatrix[j][i]) {
                    cards += CardsValue[j][i];
                }
            }
        }
        props.updatePlayer(cards);
        props.setCurrentPlayerModal("None");
    }

    return (
        <Modal centered show={props.currentPlayerModal === "Hand"} onHide={() => props.setCurrentPlayerModal("None")}>
            <Modal.Header>
                <Modal.Title>Player Hand Selector</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Cards.map((item, i) => {
                    return (
                        <Row className="flex-nowrap" key={i}>
                            {item.map((subitem, j) => {
                                return (
                                    <Col className={"no-select board-modal-card " + (i % 2 === 0 ? "red" : "black")} onClick={() => onClickCard(i, j)} style={handMatrix[i][j] ? { backgroundColor: "yellow" } : {}} key={j}>
                                        <div>{subitem}</div>
                                        {(() => {
                                            switch (i) {
                                                case 0:
                                                    return <i className="bi-suit-spade-fill"></i>;
                                                case 1:
                                                    return <i className="bi-suit-heart-fill"></i>;
                                                case 2:
                                                    return <i className="bi-suit-club-fill"></i>;
                                                case 3:
                                                    return <i className="bi-suit-diamond-fill"></i>;
                                                default:
                                                    return <i/>;
                                            }
                                        })()}
                                    </Col>
                                );
                            })}
                        </Row>
                    );
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={cardCount < 2} onClick={() => submitHand()}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

function RangeModal(props: PlayerModalProps): React.ReactElement {
    const [range, setRange] = useState<boolean[][]>(Array.from(Array(13), () => Array(13).fill(false)));

    useEffect(() => {
        setRange(props.player.rangeMatrix);
    }, [props.player]);

    function getDisplay(i: number, j: number): string {
        if (range[i][j]) {
            return "yellow";
        } else if (i < j) {
            return "#AAAAAA";
        } else if (i === j) {
            return "#F8F9FA";
        } else {
            return "#3D3D3D";
        }
    }

    function onClickChart(i: number, j: number): void {
        const tempRange = [...range];
        tempRange[i][j] = !tempRange[i][j];
        setRange(tempRange);
    }

    function onMouseOverChart(event: MouseEvent, i: number, j: number): void {
        if (event.buttons === 1) {
            const tempRange = [...range];
            tempRange[i][j] = !tempRange[i][j];
            setRange(tempRange);
        }
    }

    function submitRange(): void {
        const val: string[] = [];
        range.forEach((row, i) => {
            row.forEach((col, j) => {
                if (col) val.push(Hands[i][j]);
            });
        });
        if (val.length > 0) {
            props.updatePlayer(prange.reverse(val));
        } else {
            props.updatePlayer("Empty...");
        }
        props.setCurrentPlayerModal("None");
    }

    return (
        <Modal centered size="lg" show={props.currentPlayerModal === "Range"} onHide={() => props.setCurrentPlayerModal("None")}>
            <Modal.Header>
                <Modal.Title>Player Range Selector</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="range-chart-container" style={{ width: "fit-content", paddingTop: "1px", backgroundColor: "black" }}>
                    {Hands.map((item, i) => {
                        return (
                            <Row key={i} className="justify-content-center" xs="auto" style={{ width: "fit-content" }}>
                                {item.map((subitem, j) => {
                                    return (
                                        <div key={j} className="no-select square player-range-modal-square" style={{ background: getDisplay(i, j), textAlign: "center" }} onMouseDown={() => onClickChart(i, j)} onMouseOver={(event) => onMouseOverChart(event, i, j)}>{subitem}</div>
                                    );
                                })}
                            </Row>
                        );
                    })}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => submitRange()}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PlayerModal;
