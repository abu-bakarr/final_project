import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonCard,
  IonLoading,
  IonCardContent,
  useIonAlert,
  IonIcon,
} from '@ionic/react';
import './Home.css';
// import logo from '../images/mohs_logo.png';
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../env';
import { Storage } from '@capacitor/storage';
import { useHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import { eye, eyeOff } from 'ionicons/icons';
import { Link } from 'react-router-dom';

const Home = (props) => {
  const history = useHistory();
  const [showAlert] = useIonAlert();
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === null || formData.email === '') {
      showAlert({
        header: 'Error',
        message: 'Please input your email.',
        buttons: [{ text: 'Ok' }],
      });
    } else if (formData.password === null || formData.password === '') {
      showAlert({
        header: 'Error',
        message: 'Please input your password.',
        buttons: [{ text: 'Ok' }],
      });
    } else {
      let content = {
        email: formData.email,
        password: formData.password,
      };
      console.log(content);

      setLoading(true);

      const getResp = await axios.post(`${BASE_URL}auth`, content);
      setLoading(false);
      console.log('getResp', getResp);
      if (getResp.status === 200) {
        Storage.set({
          key: 'authTokens',
          value: JSON.stringify(getResp.data),
        });

        let user_data = jwtDecode(getResp.data);
        Storage.set({ key: 'user', value: JSON.stringify(user_data) });

        return history.push('/dashboard');
      } else {
        showAlert({
          header: 'Error',
          message: 'Wrong email or Password.',
          buttons: [{ text: 'Ok' }],
        });
      }

      // axios
      //   .post(`${BASE_URL}auth`, content)
      //   .then((response) => {
      //     setLoading(false);
      //     Storage.set({
      //       key: 'authTokens',
      //       value: JSON.stringify(response.data),
      //     });

      //     let user_data = jwtDecode(response.data);
      //     Storage.set({ key: 'user', value: JSON.stringify(user_data) });

      //     return history.push('/dashboard');
      //   })
      //   .catch((error) => {
      //     setLoading(false);
      //     if (error) {
      //       showAlert({
      //         header: 'Error',
      //         message: 'Wrong email or Password.',
      //         buttons: [{ text: 'Ok' }],
      //       });
      //     }
      //   });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-color" style={{ color: '#fff' }}>
          <IonTitle className="text-center">DevMeet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={loading} message={'Please Wait...'} duration={0} />
        <IonGrid style={{ marginTop: '7%' }}>
          <IonRow>
            <IonCol size-sm="12">
              {/* <img src={logo} alt="mohs_logo.jpg" className="rounded mx-auto" /> */}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol
              className="text-center"
              size-sm="12"
              size-md="4"
              offsetMd="4"
            >
              <h3 className="text-center text-2xl">Sign In</h3>
              <IonCard>
                <IonCardContent>
                  <br />
                  <div className="mb-4">
                    <IonInput
                      type="text"
                      name="email"
                      value={formData.email}
                      onIonChange={handleInputChange}
                      placeholder="&nbsp;&nbsp;email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></IonInput>
                  </div>
                  <div className=" flex mb-4">
                    <IonRow>
                      <IonInput
                        type={passwordShown ? 'password' : 'text'}
                        name="password"
                        value={formData.password}
                        onIonChange={handleInputChange}
                        placeholder="&nbsp;&nbsp;Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline"
                      ></IonInput>{' '}
                      <IonIcon
                        onClick={togglePassword}
                        icon={passwordShown ? eyeOff : eye}
                      />
                    </IonRow>
                  </div>
                  <br />
                  <p className="mb-3 float-right">
                    You don't have an account ? {''}
                    <Link to="/signup">Signup Here</Link>
                  </p>
                  <br />

                  <p>
                    <IonButton
                      expand="block"
                      className="bg-color"
                      style={{ color: '#fff' }}
                      onClick={handleSubmit}
                    >
                      Login
                    </IonButton>
                  </p>
                  <br />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
