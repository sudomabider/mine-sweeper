import { connect } from 'react-redux'
import { drawBoard, syncBoard, resetBoard } from '../actions'
import Board from './Board'

const mapStateToProps = (state) => {
  return {
    map: state.boardReducer.map,
    initiated: state.boardReducer.initiated,
    dead: state.boardReducer.dead,
    win: state.boardReducer.win,
    width: state.boardReducer.width,
    height: state.boardReducer.height,
    mineCount: state.boardReducer.mineCount,
    flags: state.boardReducer.flags
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    drawBoard: (width, height, count) => {
      dispatch(syncBoard(width, height, count));
      dispatch(drawBoard());
    },
    resetBoard: () => {
      dispatch(resetBoard());
    }
  }
}

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default BoardContainer