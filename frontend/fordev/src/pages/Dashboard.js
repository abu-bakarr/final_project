/* eslint-disable react-hooks/exhaustive-deps */
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonGrid,
  IonPage,
  IonButtons,
  IonTitle,
  IonBackButton,
} from '@ionic/react';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../env';
import Posts from './Posts';
import { Storage } from '@capacitor/storage';
import { NavButtons } from '../components/NavButton';

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
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-color" style={{ color: '#fff' }}>
          <IonButtons slot="start">
            <NavButtons />
          </IonButtons>
          <IonTitle className="text-left text-sm">
            Welcome to DevTalk {username.toUpperCase()}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          {posts.length < 0 ? 'No Post Available' : renderPosts(posts)}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
