import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonCard,
  IonLoading,
  IonCardContent,
  IonItem,
  IonLabel,
  useIonAlert,
} from '@ionic/react';
import './Home.css';
import logo from '../images/logo.png';
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../env';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import IonInputController from '../components/IonInputController';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [showAlert] = useIonAlert();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const compareConfirmPassword = (data) => {
    return data['password'] === data['confirmPassword'] ? true : false;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const samePassword = await compareConfirmPassword(data);
    if (samePassword === true) {
      console.log('data =>', data);
      const getResp = await axios.post(`${BASE_URL}user/`, data);

      console.log('getRep =>', await getResp.json());

      if (getResp.status === 200) {
        setLoading(false);
        reset();
        showAlert({
          header: 'success',
          message: 'you have successfully registered, please login',
          buttons: [{ text: 'Ok' }],
        });
        return history.replace('/login');
      }
      if (getResp.status === 409) {
        setLoading(false);
        showAlert({
          header: 'Error',
          message: 'Email already exists',
          buttons: [{ text: 'Ok' }],
        });
      }
    } else {
      showAlert({
        header: 'Error',
        message: 'Password is not the same.',
        buttons: [{ text: 'Ok' }],
      });
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-color" style={{ color: '#fff' }}>
          <IonTitle className="text-center">For Developers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={loading} message={'Loading ....'} duration={0} />
        <IonGrid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonRow>
              <IonCol size-sm="12">
                <img
                  src={logo}
                  alt="for dev logo"
                  className="rounded mx-auto"
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="text-center" size-sm="12" size-md="1">
                <h3 className="text-center text-1xl">Sign Up</h3>
                <IonCard>
                  <IonCardContent>
                    <IonRow>
                      <IonCol size-sm="12" size-md="12">
                        <IonItem>
                          <IonLabel
                            className="text-sm text-black-700"
                            position="floating"
                          >
                            First Name:
                          </IonLabel>
                          <IonInputController
                            name="firstName"
                            control={control}
                            placeholder="Enter your First name"
                            type="text"
                          />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    {errors && (
                      <IonLabel color="dark">
                        <span className="text-left text-red-700">
                          {errors.firstName?.type === 'required' &&
                            'first name is required'}
                        </span>
                      </IonLabel>
                    )}
                    <IonRow>
                      <IonCol size-sm="12" size-md="12">
                        <IonItem>
                          <IonLabel
                            className="text-sm text-black-700"
                            position="floating"
                          >
                            Last Name:
                          </IonLabel>
                          <IonInputController
                            name="lastName"
                            control={control}
                            placeholder="Enter your last name"
                            type="text"
                          />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    {errors && (
                      <IonLabel color="dark">
                        <span className="text-left text-red-700">
                          {errors.lastName?.type === 'required' &&
                            'last name is required'}
                        </span>
                      </IonLabel>
                    )}
                    <IonRow>
                      <IonCol size-sm="12" size-md="12">
                        <IonItem>
                          <IonLabel
                            className="text-sm text-black-700"
                            position="floating"
                          >
                            Email:
                          </IonLabel>
                          <IonInputController
                            name="email"
                            control={control}
                            placeholder="Enter your Email"
                            type="email"
                          />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    {errors && (
                      <IonLabel color="dark">
                        <span className="text-left text-red-700">
                          {errors.email?.type === 'required' &&
                            'email is required'}
                        </span>
                      </IonLabel>
                    )}
                    <IonRow>
                      <IonCol size-sm="12" size-md="12">
                        <IonItem>
                          <IonLabel
                            className=" text-sm text-black-700"
                            position="floating"
                          >
                            Password:
                          </IonLabel>
                          <IonInputController
                            name="password"
                            control={control}
                            placeholder="Enter your Password"
                            type="password"
                          />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    {errors && (
                      <IonLabel color="dark">
                        <span className="text-left text-red-700">
                          {errors.password?.type === 'required' &&
                            'Password is required'}
                        </span>
                      </IonLabel>
                    )}
                    <IonRow>
                      <IonCol size-sm="12" size-md="12">
                        <IonItem>
                          <IonLabel
                            className="text-sm text-black-700"
                            position="floating"
                          >
                            Confirm Password:
                          </IonLabel>
                          <IonInputController
                            name="confirmPassword"
                            control={control}
                            placeholder="confirm Password"
                            type="password"
                          />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    {errors && (
                      <IonLabel color="dark">
                        <span className="text-left text-red-700">
                          {errors.confirmPassword?.type === 'required' &&
                            'confirm Password is required'}
                        </span>
                      </IonLabel>
                    )}
                    <br />
                    <IonLabel className="mt-2 mb-3 text-muted text-center float-center">
                      Already have an account ? {''}
                      <Link to="/login">
                        <span className="text-blue-700"> Login Here</span>
                      </Link>
                    </IonLabel>
                    <IonButton
                      expand="block"
                      className="bg-color"
                      style={{ color: '#fff' }}
                      type="submit"
                    >
                      Register
                    </IonButton>
                    <br />
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
