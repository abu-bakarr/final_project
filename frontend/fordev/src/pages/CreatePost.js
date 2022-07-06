/* eslint-disable react-hooks/exhaustive-deps */
import {
  IonPage,
  IonRow,
  IonItem,
  IonTextarea,
  IonButton,
  IonAvatar,
  IonLabel,
  IonItemDivider,
  IonGrid,
  IonCol,
  IonLoading,
  useIonAlert,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonContent,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonTitle,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../env';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import IonInputController from '../components/IonInputController';
import { Storage } from '@capacitor/storage';
import { NavButtons } from '../components/NavButton';

export default function CreatePost() {
  const history = useHistory();
  const [showAlert] = useIonAlert();
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState('');

  const initialValues = { name: '', text: '' };

  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  useEffect(async () => {
    const token = await Storage.get({ key: 'authTokens' });
    setUserToken(token.value);
  }, []);

  const onSubmit = async (data) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    };

    console.log('onSubmit', data);

    setLoading(true);

    await axios
      .post(`${BASE_URL}posts`, data, {
        headers: headers,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          showAlert({
            header: 'sucess',
            message: 'You successfully a post',
            buttons: [{ text: 'Ok' }],
          });
          reset();
          history.replace('/post');
        }
        console.log('res', res);
      })
      .catch((err) => {
        setLoading(false);
        showAlert({
          header: 'ERROR',
          message: err,
          buttons: [{ text: 'Ok' }],
        });
      });
  };

  return (
    <IonPage>
      <IonToolbar className="bg-color" style={{ color: '#fff' }}>
        <IonButtons slot="start">
          <NavButtons />
        </IonButtons>
        <IonTitle className="text-left text-sm">
          Make your contribution
        </IonTitle>
      </IonToolbar>
      <IonContent>
        <IonLoading isOpen={loading} message={'loading ....'} duration={0} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonRow>
            <IonCol size-sm="12" size-md="12">
              <IonItem>
                <IonLabel
                  className="text-sm text-black-700"
                  position="floating"
                >
                  Topic:
                </IonLabel>
                <IonInputController
                  name="name"
                  control={control}
                  placeholder="Enter the topic"
                  type="text"
                />
              </IonItem>
            </IonCol>
          </IonRow>
          {errors && (
            <IonLabel color="dark">
              <span className="text-left text-red-700">
                {errors.name?.type === 'required' && 'topic is required'}
              </span>
            </IonLabel>
          )}
          <IonRow>
            <IonItemDivider>
              <IonItem>
                <IonLabel
                  className="text-sm text-black-700"
                  position="floating"
                >
                  Post
                </IonLabel>
                <IonTextarea
                  rows={12}
                  {...register('text')}
                  cols={92}
                  value={initialValues.text}
                ></IonTextarea>
              </IonItem>
            </IonItemDivider>
          </IonRow>
          <IonButton
            expand="block"
            className="bg-color"
            style={{ color: '#fff' }}
            type="submit"
          >
            Post
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}
