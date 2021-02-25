import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../../actions/auth';

class Login extends React.Component<any, any>
{
    static propTypes: 
    {
        login: PropTypes.Validator<(...args: any[]) => any>;
        auth: PropTypes.Validator<object>;
    }

    constructor(props: any)
    {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentWillReceiveProps(nextProps:any)
    {
        if (nextProps.auth.is_authenticated) this.props.history.push('/');
    }

    onChange = (e:any) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e:any) => 
    {
        e.preventDefault();
        this.props.login(this.state);
    }

    render()
    {
        return(
            
            <div className="row mt-4">
              <div className="col-4 mx-auto">
                <div className="card">
                  <article className="card-body">
                    <h4 className="card-title text-center mb-4 mt-1">Log In</h4>
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-user"></i>
                            </span>
                          </div>
                          <input
                            className="form-control"
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            pattern=".{5,30}"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-lock"></i>
                            </span>
                          </div>
                          <input
                            className="form-control"
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            pattern=".{6,30}"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-dark btn-block">Login</button>
                      </div>
                    </form>
                  </article>
                </div>
              </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const map_state_to_props = (state:any) => ({ auth: state.auth });

export default connect(map_state_to_props, { login })(Login);