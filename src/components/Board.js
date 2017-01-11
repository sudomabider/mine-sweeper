import React, { PropTypes } from 'react'
import GridContainer from './GridContainer'
import hash from 'object-hash'

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.status = this.status.bind(this);
		this.startText = this.startText.bind(this);
	}

	status() {
		if (this.props.win) {
			return "You won! | "
		}

		if (this.props.dead) {
			return "Game over | "
		}

		return ''
	}

	startText() {
		if (typeof this.props.map === 'undefined' || this.props.map.length === 0) {
			return "start";
		}

		return "reset";
	}

	render() {
		return (
			<div>
				<div id="header">
					<span className="status">{this.status()}</span>
					<a href="#" onClick={this.props.drawBoard}>{this.startText()}</a>
				</div>
			
				{this.props.map.map((row) => {
					return (
						<div className="row" key={row[0].position.y}>
						{
							row.map((grid) =>
	  						<GridContainer grid={grid} key={hash.MD5(grid)} 
	  						initBoard={this.props.initBoard} initiated={this.props.initiated} />
							)
						}
						</div>
					)
				})}
			</div>
		)
	}
}

Board.propTypes = {
	map: PropTypes.array.isRequired,
  drawBoard: PropTypes.func.isRequired
}

Board.defaultProps = {
	map: []
}

export default Board