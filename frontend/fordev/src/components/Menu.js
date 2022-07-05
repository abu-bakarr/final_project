import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonIcon,
  useIonAlert,
} from '@ionic/react';
import { home, heart, book, settings, logOutOutline } from 'ionicons/icons';
import { Storage } from '@capacitor/storage';
import style from './Menu.module.scss';
import { useEffect, useState } from 'react';

export const Menu = () => {
  const [showAlert] = useIonAlert();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const token = await Storage.get({ key: 'user' });
      const parseData = await JSON.parse(token.value);
      setUsername(parseData?.user?.name);
    };
    getUser();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();

    showAlert({
      header: 'Exit',
      message: 'Do you want to log out?',
      buttons: [
        'No',
        {
          text: 'Ok',
          handler: (d) => {
            Storage.remove({ key: 'authTokens' });
            Storage.remove({ key: 'user' });
            window.location.replace('/');
          },
        },
      ],
    });
  };

  return (
    <IonMenu side="start" contentId="main">
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle>{username}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className={style.menu}>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={'/dashboard'} routerDirection="none">
              <IonIcon side="start" icon={home} />
              <IonLabel>Home</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={'/post'} routerDirection="none">
              <IonIcon side="start" icon={book} />
              <IonLabel>Post Comment</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={'/settings'} routerDirection="none">
              <IonIcon side="start" icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={'#'} routerDirection="none">
              <IonIcon side="start" icon={heart} />
              <IonLabel>About</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button onClick={handleLogout} routerDirection="none">
              <IonIcon side="start" icon={logOutOutline} />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
