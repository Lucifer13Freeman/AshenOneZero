import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/auth';


const Login = ({ history, auth, login }:any) =>
{
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');

  useEffect(() =>
  {
    if (auth.is_authenticated) history.push('/');
  }, [auth]);

  const on_submit = (e:any) => 
  {
    e.preventDefault();
    login({ email, password });
  }

  return(

    <div className="row mt-4">
      <div className="col-4 mx-auto">
        <div className="card">
          <article className="card-body">
            <h4 className="card-title text-center mb-4 mt-1">Log In</h4>
            <form onSubmit={on_submit}>
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
                    value={email}
                    onChange={e => set_email(e.target.value)}
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
                    value={password}
                    onChange={e => set_password(e.target.value)}
                    pattern=".{6,30}"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-$primary_btn_color btn-block">Login</button>
              </div>
            </form>
          </article>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state:any) => ({ auth: state.auth });

export default connect(mapStateToProps, { login })(Login);