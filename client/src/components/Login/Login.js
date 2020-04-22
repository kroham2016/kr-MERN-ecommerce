import React, { Component } from 'react'
import {connect} from 'react-redux';
import {loginUser} from '../../actions/user_actions'
import {Link} from 'react-router-dom';

class Login extends Component {
    
    state = {
        email: "",
        password: "",
        errors: []
    };

handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
}

submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {
        email: this.state.email,
        password: this.state.password
    };

    //form validation
    if(this.isFormValid(this.state)){
        this.setState({errors: [] }); //clear errors
        this.props.dispatch(loginUser(dataToSubmit))
        .then(response => {
            if(response.payload.loginSuccess) {
                this.props.history.push('/');
            } else{
                this.setState({errors: this.state.errors.concat(
                    "Login failed. Please check e-mail and password."
                )})
            }
        });
    } else {
        this.setState({errors: this.state.errors.concat("Form is not valid.")})
    }
}

isFormValid =({email,password}) => email && password;

displayErrors = errors => errors.map((error,i) => <p key={i}>{error}</p>)


render() {
return (
<div className="container">
    <h2>Login</h2>
    <div className="row">
        <form className="col s12">
            <div className="row">
                <div className="input-field col s12">
                    <input 
                    name="email" 
                    id="email"
                    type="email"
                    className="validate" //from materialize css, validates the email
                    value={this.state.email} 
                    onChange={e=> this.handleChange(e)}
                    autoComplete="e-mail"
                    />
                    <label className="active" htmlFor='email'>Email</label>
                    <span 
                        className='helper-text' 
                        data-error='wrong' 
                        data-success='right'
                        />
                </div>
            </div>

            <div className='row'> 
                <div className="input-field col s12">
                    <input 
                        name='password'
                        id='password'
                        type='password'
                        className='validate'
                        value={this.state.password}
                        onChange={e=> this.handleChange(e)}
                        autoComplete="current-password"
                    />
                    <label className="active" htmlFor='password'>Password</label>
                    <span 
                        className='helper-text' 
                        data-error='wrong' 
                        data-succes='right' 
                        />
                </div>
            </div>
            {this.state.errors.length > 0 && (
                <div className='row'>
                    {this.displayErrors(this.state.errors)}
                </div>
            )}
            <div className="row">
                <div className="col s12">
                    <button
                        className='btn waves-effect waves-light teal lighten'
                        type='submit'
                        name='action'
                        onClick={this.submitForm}
                    >
                        Login
                    </button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to='/register'>
                    <button
                        className='btn waves-effect waves-light teal lighten'
                        type='button'
                    >
                        Register
                    </button>
                    </Link>
                </div>
            </div>

        </form>
    </div>
</div>
)
}
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Login);