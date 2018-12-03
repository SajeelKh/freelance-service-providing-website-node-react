import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleClick = e => {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.login(username, password);
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return (
            <form action="" method=''>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                <input type="submit" onClick={this.handleClick} />
            </form>
        );
    }
}

const mapStateToProps = () => {
    return {};
}

Login = connect(mapStateToProps, { ...userActions })(Login);

export default Login;