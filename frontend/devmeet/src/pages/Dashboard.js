/* eslint-disable react-hooks/exhaustive-deps */
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonGrid,
  IonListHeader,
  IonPage,
  IonButtons,
} from '@ionic/react';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../env';
import Posts from './Posts';
import { Menu } from '../components/Menu';
import { Storage } from '@capacitor/storage';

const Dashboard = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(async () => {
    const getPosts = await axios.get(`${BASE_URL}posts/`);
    getPosts ? setPosts(getPosts.data.post) : setPosts([]);
  }, []);

  useEffect(async () => {
    const token = await Storage.get({ key: 'user' });
    const parseData = await JSON.parse(token.value);
    setUsername(parseData?.user?.name);
  }, []);

  const renderPosts = (data) => {
    return <Posts posts={data} />;
  };

  return (
    <>
      <IonPage>
        <Menu />
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start"></IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            <IonListHeader className="text-center">
              Welcome to Dev Meet {username}
            </IonListHeader>
            {posts.length < 0 ? 'No Post Available' : renderPosts(posts)}
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Dashboard;
