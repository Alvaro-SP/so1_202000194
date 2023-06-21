import React, { Component } from 'react';
import moment from 'moment';
import '../styles/style.scss'
class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
        time: moment().format('LTS'),
        one: true,
        two: false,
        three: false,
        four: false,
        background: {
            backgroundColor: '#463f3f7d'
        },
        class: ''
        };
        this.clicked = this.clicked.bind(this);
    }

    componentDidMount() {
        this.intervalID = setInterval(() => {
        if (this.state.one) {
            this.setState({ time: moment().format('LTS') });
        } else if (this.state.four) {
            this.setState({ time: moment().format('LT') });
        }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    clicked() {
        this.setState({
        background: {
            backgroundColor: `#463f3f7d`
        },
        class: 'faded'
        });
        setTimeout(() => {
        if (this.state.one) {
            this.setState({
            time: moment().format('l'),
            one: false,
            two: true,
            class: ''
            });
        } else if (this.state.two) {
            this.setState({
            time: moment().format('MMMM Do YY'),
            two: false,
            three: true,
            class: ''
            });
        } else if (this.state.three) {
            this.setState({
            time: moment().format('LT'),
            three: false,
            four: true,
            class: ''
            });
        } else if (this.state.four) {
            this.setState({
            time: moment().format('LTS'),
            four: false,
            one: true,
            class: ''
            });
        }
        }, 200);
    }

    render() {
        return (
        <div id="clock" style={this.state.background} onClick={this.clicked}>
            <h1 className={this.state.class}>{this.state.time}</h1>
        </div>
        );
    }
    }

export default Clock;