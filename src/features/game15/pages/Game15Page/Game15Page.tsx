import { Col, Row, Stepper } from "@ebs-integrator/react-ebs-ui";
import { Board } from "../../components/organisms/Board/Board";
import { useStateHandlers } from "hooks";
import { useCallback } from "react";

export interface GamesSizes {
  rows: number;
  columns: number;
}

interface State extends GamesSizes {
  moves: number;
}

const Game15Page = () => {
  const [state, setState] = useStateHandlers<State>({
    rows: 3,
    columns: 3,
    moves: 0,
  });

  const onRowsChange = (rows?: string | number) =>
    setState({ rows: Number(rows) });
  const onColumnsChange = (columns?: string | number) =>
    setState({ columns: Number(columns) });
  const onIncreaseMoves = useCallback(
    () => setState((prevState) => ({ moves: ++prevState.moves })),
    []
  );

  return (
    <Row className="game15 justify-content--center">
      <Col size={6}>
        <Row className="justify-content--center">
          <Col>
            <Row className="game-title">
              <Col size={6}>Jocul 15</Col>
              <Col size={6}>Moves: {state.moves}</Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content--center my-30">
          <Col>
            <Stepper
              min={3}
              max={100}
              placeholder="Rows"
              value={state.rows}
              onChange={onRowsChange}
            />
          </Col>
          <Col>
            <Stepper
              min={3}
              max={100}
              placeholder="Columns"
              value={state.columns}
              onChange={onColumnsChange}
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content--center">
            {state.rows > 0 && state.columns > 0 && (
              <Board
                sizes={{ rows: state.rows, columns: state.columns }}
                onIncreaseMoves={onIncreaseMoves}
              />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Game15Page;
