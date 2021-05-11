import { Button, Icon, Modal, Row, Space } from "@ebs-integrator/react-ebs-ui";
import { useCallback, useEffect } from "react";
import { GamesSizes } from "../../../pages/Game15Page/Game15Page";
import { useStateHandlers } from "../../../../../hooks";

interface CellProps {
  id: number;
  key: number;
  active: boolean;
}

export const Board = ({
  sizes,
  onIncreaseMoves,
}: {
  sizes: GamesSizes;
  onIncreaseMoves: () => void;
}) => {
  const [state, setState] = useStateHandlers<{
    cells: CellProps[];
    showModal?: boolean;
  }>({
    cells: [],
  });

  const length = sizes.rows * sizes.columns;

  useEffect(() => {
    const setInitialCells = () => {
      let key = 0;

      setState({
        cells: Array.from({ length: sizes.rows }, () =>
          Array.from({ length: sizes.columns }, () => ({
            key: key++,
            id: length - key,
            active: key !== length,
          }))
        ).flat(),
      });
    };

    setInitialCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes]);

  useEffect(() => {
    if (state.cells[length - 2]?.id === 8 && !state.showModal) {
      let isCorrectAnswer = 1;

      state.cells.map((i, key) => {
        if (i.id !== key + 1 && i.active) {
          isCorrectAnswer = 0;
        }

        return i;
      });

      if (isCorrectAnswer) {
        setState({ showModal: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onCellClick = useCallback(
    (cell: CellProps) => {
      const localCells = state.cells;

      const emptyCell = localCells.find((i) => !i.active);

      if (
        emptyCell &&
        (cell.key === emptyCell.key - 1 ||
          cell.key === emptyCell.key + 1 ||
          cell.key === emptyCell.key - sizes.columns ||
          cell.key === emptyCell.key + sizes.columns)
      ) {
        localCells[emptyCell.key] = { ...cell, key: emptyCell.key };
        localCells[cell.key] = { ...emptyCell, key: cell.key };

        // onIncreaseMoves();

        setState({ cells: localCells });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.cells, sizes]
  );

  const onModalChange = () =>
    setState((prevState) => ({ showModal: !prevState.showModal }));

  return (
    <>
      {state.showModal && (
        <Modal onClose={onModalChange} title="Success">
          <Modal.Content>
            <Row className="big-text justify-content--center">
              You won this game
            </Row>
          </Modal.Content>
          <Modal.Footer>
            <Space justify="space-between">
              <Space>
                <Button
                  type="primary"
                  prefix={<Icon type="check" />}
                  onClick={onModalChange}
                  className="big-text"
                >
                  Close
                </Button>
              </Space>
            </Space>
          </Modal.Footer>
        </Modal>
      )}

      <div className="game-container">
        <div className="cells-wrapper">
          <Row>
            {state.cells.map((i) => (
              <div
                className={`game-cell ${i.active ? "active" : ""}`}
                key={i.id}
                style={{
                  flexBasis: `${100 / sizes.columns - 3}%`,
                }}
                onClick={() => onCellClick(i)}
              >
                <>{i.active && i.id}</>
              </div>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};
