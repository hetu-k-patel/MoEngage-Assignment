import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { UserRegistration, UsernameValidation } from '../services/RegistrationService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import {
   REGISTRATION_FIELDS,
   REGISTRATION_MESSAGE,
   COMMON_FIELDS,
   ERROR_IN_REGISTRATION,
} from '../MessageBundle';

const initial = {
   first_name: '',
   last_name: '',
   user_name: '',
   password: '',
   register: false,
   error: false,
};

const Registration = () => {
   const [data, setData] = useState(initial);
   const history = useHistory();

   const handleOnChangeFirstName = (e) => {
      setData({ ...data, first_name: e.target.value });
   };

   const handleOnChangeLastName = (e) => {
      setData({ ...data, last_name: e.target.value });
   };

   const handleOnChangeUserName = (e) => {
      setData({ ...data, user_name: e.target.value });
   };

   const handleOnChangePassword = (e) => {
      setData({ ...data, password: e.target.value });
   };

   const handleOnBlur = async (e) => {
      setData({ ...data, user_name: e.target.value });
      const data1 = {
         user_name: data.user_name,
      };
      const isUsernameTaken = await UsernameValidation(data1);

      isUsernameTaken === 204
         ? setData({ ...data, user_name_taken: true })
         : setData({ ...data, user_name_taken: false });
   };

   const onSubmit = async (e) => {
      e.preventDefault();
      const data1 = {
         first_name: data.first_name,
         last_name: data.last_name,
         user_name: data.user_name,
         password: data.password,
      };

      const registerStatus = await UserRegistration(data1);
      if (registerStatus === 200) {
         setData({ ...initial });
         history.push('/login');
      } else setData({ ...data, error: true, register: false });
   };

   return (
      <div className="Registration">
         <h1> {REGISTRATION_FIELDS.REGISTRATION_HEADING} </h1>{' '}
         <form onSubmit={onSubmit}>
            <div>
               <div className="fields">
                  <p> {REGISTRATION_FIELDS.FIRST_NAME} </p>{' '}
                  <input
                     type="text"
                     value={data.first_name}
                     name="FirstName"
                     onChange={handleOnChangeFirstName}
                  />{' '}
               </div>{' '}
               <div className="fields">
                  <p> {REGISTRATION_FIELDS.LAST_NAME} </p>{' '}
                  <input
                     type="text"
                     value={data.last_name}
                     name="LastName"
                     onChange={handleOnChangeLastName}
                  />{' '}
               </div>{' '}
               <div className="fields">
                  <p> {COMMON_FIELDS.USER_NAME} </p>{' '}
                  <input
                     type="text"
                     className={classNames({ error: data.user_name_taken })}
                     value={data.user_name}
                     name="Username"
                     onBlur={handleOnBlur}
                     onChange={handleOnChangeUserName}
                     autoComplete="Username"
                     required
                  />
               </div>{' '}
               <div className="fields">
                  <p> {COMMON_FIELDS.PASSWORD} </p>{' '}
                  <input
                     type="password"
                     value={data.password}
                     name="Password"
                     onChange={handleOnChangePassword}
                     autoComplete="password"
                     required
                  />
               </div>{' '}
               <div className="buttons">
                  <button
                     type="submit"
                     className="btn btn-primary"
                     disabled={data.user_name_taken}
                  >
                     {' '}
                     {REGISTRATION_FIELDS.REGISTER}{' '}
                  </button>{' '}
                  <Link to="/login"> {REGISTRATION_FIELDS.CANCEL} </Link>{' '}
               </div>{' '}
            </div>{' '}
         </form>{' '}
         {data.error && <Error message={ERROR_IN_REGISTRATION} />}{' '}
         {data.register && <Message message={REGISTRATION_MESSAGE} />}{' '}
      </div>
   );
};

export default Registration;
