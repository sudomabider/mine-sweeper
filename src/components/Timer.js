import React from 'react'

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			elapsed: 0
		}
		this.tick = this.tick.bind(this);
	}

	componentDidMount(){
		this.timer = setInterval(this.tick, 1000);
	}

	componentWillUnmount(){
		clearInterval(this.timer);
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.stop)
		if (nextProps.stop) {
			clearInterval(this.timer);
		}
	}

	tick(){
		this.setState({elapsed: this.state.elapsed + 1});
	}

	render() {
		const seconds = this.state.elapsed;

		let h = Math.floor(seconds / 3600);
		let m = Math.floor(seconds % 3600 / 60);
		let s = Math.floor(seconds % 3600 % 60);

		if (h < 10) {
			h = '0' + h
		}

		if (m < 10) {
			m = '0' + m
		}

		if (s < 10) {
			s = '0' + s
		}
		return (<span>{h + ":" + m + ":" + s}</span>);
	}
}

export default Timer