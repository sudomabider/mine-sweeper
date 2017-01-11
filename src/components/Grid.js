import React from 'react'

class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.display = this.display.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onRightClick = this.onRightClick.bind(this);
	}

	display() {
		if (this.props.grid.isFlagged) {
			return (<i className="fa fa-flag" style={{color: "red"}} />);
		}

		if (!this.props.grid.isRevealed) {
			return '';
		}

		if (this.props.grid.isMine) {
			return (<i className="fa fa-bomb" />);
		}

		return this.displayNumber();
	}

	displayNumber() {
		const number = this.props.grid.number;
		switch (number) {
			case 0:
				return ''
			case 1:
				return (<b style={{color:"Blue"}}>1</b>)
			case 2:
				return (<b style={{color:"BlueViolet"}}>2</b>)
			case 3:
				return (<b style={{color:"CadetBlue"}}>3</b>)
			case 4:
				return (<b style={{color:"DarkGreen"}}>4</b>)
			case 5:
				return (<b style={{color:"DarkMagenta"}}>5</b>)
			case 6:
				return (<b style={{color:"Chocolate"}}>6</b>)
			case 7:
				return (<b style={{color:"DeepPink"}}>7</b>)
			case 8:
				return (<b style={{color:"FireBrick"}}>8</b>)
			default:
				return ''
		}
	}

	className() {
		let className = "grid";



		if (this.props.grid.isRevealed) {
			className += " grid-revealed"
		}

		if (this.props.grid.error) {
			className += " error"
		} else if (this.props.grid.error) {
			className += " warning"
		}

		return className;
	}

	onClick() {
		if (this.props.grid.isRevealed) {
			return;
		}

		if (!this.props.initiated) {
			this.props.initBoard(this.props.grid.position.x, this.props.grid.position.y);
		}

		this.props.revealGrid(this.props.grid.position.x, this.props.grid.position.y);

		if (this.props.grid.isMine) {
			this.props.gameOver(this.props.grid.position.x, this.props.grid.position.y);
		}
	}

	onRightClick(e) {
		e.preventDefault();
		if (!this.props.initiated || this.props.grid.isRevealed) {
			return;
		}

		this.props.flagGrid(this.props.grid.position.x, this.props.grid.position.y);
	}

	render() {
		return (
			<div className={this.className()} onClick={this.onClick} onContextMenu={this.onRightClick}>
				{this.display()}
			</div>
		)
	}
}

export default Grid