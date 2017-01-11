import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { initBoard, revealGrid, flagGrid, gameOver } from '../actions'
import { gridReducer } from '../reducers'
import Grid from './Grid'

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initBoard: (x, y) => {
      dispatch(initBoard(x, y));
    },
    revealGrid: (x, y) => {
      dispatch(revealGrid(x, y));
    },
    flagGrid: (x, y) => {
      dispatch(flagGrid(x, y));
    },
    gameOver: (x, y) => {
      dispatch(gameOver(x, y));
    }
  }
}

const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid)

GridContainer.propTypes = {
  grid: PropTypes.object.isRequired
}

export default GridContainer