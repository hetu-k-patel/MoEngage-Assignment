import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginService from '../services/LoginService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import {
   COMMON_FIELDS,
   REGISTRATION_FIELDS,
   LOGIN_FIELDS,
   LOGIN_MESSAGE,
   ERROR_IN_LOGIN,
} from '../MessageBundle';

const initial = {
   user_name: '',
   password: '',
   error: false,
   loginSuccess: false,
};

const Login = () => {
   const history = useHistory();
   const [data, setData] = useState(initial);

   const handleOnChangeUserName = (e) => {
      setData({ ...data, user_name: e.target.value });
   };

   const handleOnChangePassword = (e) => {
      setData({ ...data, password: e.target.value });
   };

   const onSubmit = async (e) => {
      const data1 = {
         user_name: data.user_name,
         password: data.password,
      };
      const loginResult = await LoginService(data1);
      if (loginResult !== 200) {
         setData({ ...data, error: true, loginSuccess: false });
      } else {
         // setData({ ...data, loginSuccess: true, error: false });
         history.push('/hotels');
      }
   };

   return (
      <div className="Login">
         <h1> {LOGIN_FIELDS.LOGIN_HEADING} </h1>{' '}
         <form onSubmit={onSubmit}>
            <div>
               <div className="fields">
                  <p> {COMMON_FIELDS.USER_NAME} </p>{' '}
                  <input
                     type="text"
                     name="Username"
                     onChange={handleOnChangeUserName}
                     autoComplete="Username"
                     required
                  />
               </div>{' '}
               <div className="fields">
                  {' '}
                  <p> {COMMON_FIELDS.PASSWORD} </p>{' '}
                  <input
                     type="password"
                     name="Password"
                     onChange={handleOnChangePassword}
                     autoComplete="Password"
                     required
                  />{' '}
               </div>{' '}
               <div className="buttons">
                  {' '}
                  <button type="button" onClick={onSubmit} className="btn btn-primary">
                     {' '}
                     {LOGIN_FIELDS.LOGIN}{' '}
                  </button>{' '}
                  <Link to="/register">{REGISTRATION_FIELDS.REGISTER} </Link>{' '}
               </div>{' '}
            </div>{' '}
         </form>{' '}
         {data.loginSuccess && <Message message={LOGIN_MESSAGE} />}{' '}
         {data.error && <Error message={ERROR_IN_LOGIN} />}{' '}
      </div>
   );
};

export default Login;
