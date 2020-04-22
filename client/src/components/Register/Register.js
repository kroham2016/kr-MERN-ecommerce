import React, {
    Component
} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {registerUser} from '../../actions/user_actions'

class Register extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordCfm:'',
        errors: []
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    displayErrors = errors => errors.map((error,i) => {
        return <p key={i}>{error}</p>;
    })

    isFormValid = () => {
        if(this.isFormEmpty(this.state)){
            this.setState({errors: this.state.errors.concat( "Fill in all fields.")});
        } else if (!this.isPasswordValid(this.state)){
            this.setState({errors: this.state.errors.concat("Check if passwords match and at least 6 characters.")});
        } else{
            return true;
        }

        }

    isPasswordValid = ({password,passwordCfm}) => {
        if(password.length < 6 || passwordCfm.length < 6){
            return false;
        } else if(password !== passwordCfm){
            return false;
        } else {
            return true;
        }
    }

    isFormEmpty = ({firstName,lastName,email,password,passwordCfm}) => {
        return(
            !firstName.length ||
            !lastName.length ||
            !email.length ||
            !password.length ||
            !passwordCfm.length
        )
    }

    submitForm = event =>{
        event.preventDefault();

        let dataToSubmit = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        console.log(dataToSubmit);

        //check if the form is valid 
        if(this.isFormValid()){
            this.setState({errors: []});
            this.props.dispatch(registerUser(dataToSubmit))
            .then(response => {
                console.log(response);
                if(response.payload.success){
                    this.props.history.push('/login');
                }else{
                    this.setState({
                        errors: this.state.errors.concat("Registration failed. Reason: " + response.payload.err.errmsg)
                    })
                }
            })
            .catch(err =>{
                this.setState({
                    errors: this.state.errors.concat(err)
                })
            })
        }else{
            console.error('The form is not valid.')
        }
    }
    
    render() {
        return (
            <div className="container">
                <h2>Sign Up</h2>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    name="firstName"
                                    id="firstName"
                                    type="text"
                                    className="validate" //from materialize css, validates the email
                                    value={this.state.firstName}
                                    onChange={e => this.handleChange(e)}
                                    autoComplete="given-name"
                                />
                                <label className="active" htmlFor='firstName'>First Name</label>
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
                                    name='lastName'
                                    id='lastName'
                                    type='text'
                                    className='validate'
                                    value={this.state.lastName}
                                    onChange={e => this.handleChange(e)}
                                    autoComplete="family-name"
                                />
                                <label className="active" htmlFor='lastName'>Last Name</label>
                                <span
                                    className='helper-text'
                                    data-error='wrong'
                                    data-success='right'
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    className="validate" //from materialize css, validates the email
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                    autoComplete="email"
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
                                    onChange={e => this.handleChange(e)}
                                    autoComplete="new-password"
                                />
                                <label className="active" htmlFor='password'>Password</label>
                            </div>
                        </div>

                        <div className='row'>
                            <div className="input-field col s12">
                                <input
                                    name='passwordCfm'
                                    id='passwordCfm'
                                    type='password'
                                    className='validate'
                                    value={this.state.passwordCfm}
                                    onChange={e => this.handleChange(e)}
                                    autoComplete="new-password"
                                />
                                <label className="active" htmlFor='password'>Confirm Password</label>
                            </div>
                        </div>
                        {this.state.errors.length > 0 && (<div className='row'>{this.displayErrors(this.state.errors)}</div>)}
                        <div className="row">
                            <div className="col s12">
                                <button
                                    className='btn waves-effect waves-light teal lighten'
                                    type='submit'
                                    name='action'
                                    onClick={this.submitForm}
                                >
                                    Register
                                    </button>

                            </div>
                        </div>
                        <div className="row">
                            <p>Already have an account? <Link to='/login'>Log In</Link></p>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default connect()(Register);