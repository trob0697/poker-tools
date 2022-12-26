import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";

import { Cards, CardsValue } from "../../utils/models";

interface BoardProps {
    communityCards: string[]
    setCommunityCards: Function
}

function Board(props: BoardProps): React.ReactElement {
    const [show, setShow] = useState<boolean>(false);
    const [cardsMatrix, setCardsMatrix] = useState<boolean[][]>(Array.from(Array(4), () => Array(13).fill(false)));
    const [currentBoard, setCurrentBoard] = useState<string[]>([]);

    function renderCard(index: number): string {
        if (index < props.communityCards.length) {
            return "./deck/" + props.communityCards[index] + ".png";
        } else {
            return "./deck/z_cardback.png";
        }
    }

    function onModalOpen(): void {
        setCardsMatrix(Array.from(Array(4), () => Array(13).fill(false)));
        setCurrentBoard([]);
        setShow(true);
    }

    function onClickCard(i: number, j: number): void {
        const tempCardsMatrix = [...cardsMatrix];
        const tempCurrentBoard = [...currentBoard];
        const card = CardsValue[i][j];
        if (cardsMatrix[i][j]) {
            tempCardsMatrix[i][j] = false;
            tempCurrentBoard.splice(tempCurrentBoard.indexOf(card, 0), 1);
        } else if (!cardsMatrix[i][j] && currentBoard.length < 5) {
            tempCardsMatrix[i][j] = true;
            tempCurrentBoard.push(card);
        }
        setCardsMatrix(tempCardsMatrix);
        setCurrentBoard(tempCurrentBoard);
    }

    return (
        <div>
            <div className="row board" onClick={() => { onModalOpen(); }}>
                <img className="board-playing-card" alt="card" src={renderCard(0)}/>
                <img className="board-playing-card" alt="card" src={renderCard(1)}/>
                <img className="board-playing-card" alt="card" src={renderCard(2)}/>
                <img className="board-playing-card" alt="card" src={renderCard(3)}/>
                <img className="board-playing-card" alt="card" src={renderCard(4)}/>
            </div>
            <Modal centered show={show} onHide={() => setShow(false)}>
                <Modal.Header>
                    <Modal.Title>Community Cards Selector</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Cards.map((item, i) => {
                        return (
                            <Row className="flex-nowrap" key={i}>
                                {item.map((subitem, j) => {
                                    return (
                                        <Col className={"no-select board-modal-card " + (i % 2 === 0 ? "red" : "black")} onClick={() => onClickCard(i, j)} style={cardsMatrix[i][j] ? { backgroundColor: "yellow" } : {}} key={j}>
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
                    <Button onClick={() => { props.setCommunityCards(currentBoard); setShow(false); }}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Board;
