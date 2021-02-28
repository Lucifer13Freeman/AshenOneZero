import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register } from '../../actions/auth';


const Register = ({ auth, register, history }:any) =>
{
  const [surname, set_surname] = useState('');
  const [name, set_name] = useState('');
  const [patronymic, set_patronymic] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');

  useEffect(() => 
  { 
    if (auth.is_authenticated) history.push('/'); 
  }, []);

  const on_submit = (e:any) => 
  {
    e.preventDefault();
    register({ surname, name, patronymic, email, password }, history);
  }

  return (
    <div className="row mt-4">
      <div className="col-4 mx-auto">
        <div className="card">
          <article className="card-body">
            <h4 className="card-title text-center mb-4 mt-1">Registration</h4>
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
                    placeholder="Surame"
                    type="text"
                    name="surname"
                    value={surname}
                    onChange={e => set_surname(e.target.value)}
                    pattern=".{3,20}"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => set_name(e.target.value)}
                    pattern=".{3,20}"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Patronymic"
                    type="text"
                    name="patronymic"
                    value={patronymic}
                    onChange={e => set_patronymic(e.target.value)}
                    pattern=".{3,20}"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-envelope"></i>
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
                  />
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-dark btn-block">Register</button>
              </div>
            </form>
          </article>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state:any) => ({ auth: state.auth });

export default connect(mapStateToProps, { register })(Register);