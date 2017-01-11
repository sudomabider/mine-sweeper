import { connect } from 'react-redux'
import { drawBoard } from '../actions'
import Board from './Board'

const mapStateToProps = (state) => {
  return {
    map: state.boardReducer.map,
    initiated: state.boardReducer.initiated,
    dead: state.boardReducer.dead,
    win: state.boardReducer.win
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    drawBoard: (e) => {
      e.preventDefault();
      dispatch(drawBoard(10, 10));
    }
  }
}

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default BoardContainer