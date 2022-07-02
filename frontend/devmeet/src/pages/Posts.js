import {
  IonLoading,
  IonCard,
  IonLabel,
  IonItem,
  IonAvatar,
  IonList,
  IonModal,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonViewWillEnter,
  IonButton,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import PostDetails from './PostDetails';
import axios from 'axios';
import { BASE_URL } from '../env';
import { useHistory } from 'react-router';
import { Storage } from '@capacitor/storage';

export default function Posts({ posts }) {
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postsInfo, setPostsInfo] = useState({});
  const [commentsInfo, setCommentsInfo] = useState({});

  const history = useHistory();

  const loadData = () => {
    posts.length > 10 ? setInfiniteDisabled(true) : setInfiniteDisabled(false);
  };

  const handleClick = async (i, item) => {
    const token = await Storage.get({ key: 'authTokens' });

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token.value,
    };

    setLoading(true);
    const getPost = await axios.get(`${BASE_URL}posts/${item.id}`, {
      headers: headers,
    });
    const getComments = await axios.get(
      `${BASE_URL}posts/${item.id}/comments`,
      {
        headers: headers,
      }
    );
    if (getPost) {
      setPostsInfo(getPost);
      setCommentsInfo(getComments);
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    loadData();
  });

  return (
    <>
      <h4 className="text-center leading-tight appearance-none text-2xl ">
        List of Posts
      </h4>
      {showModal && <PostDetails comments={commentsInfo} posts={postsInfo} />}
      <IonLoading isOpen={loading} message={'Please Wait...'} duration={0} />
      {posts.map((item, id) => {
        return (
          <IonCard
            key={item.id}
            onClick={(i) => {
              setShowModal(true);
              handleClick(i, item);
            }}
          >
            <IonList>
              <IonItem>
                <IonAvatar slot="start"></IonAvatar>
                <IonLabel>
                  <h2>
                    <strong>{item.name}</strong>
                  </h2>
                  <h5>
                    By: {item.user.firstName} {item.user.lastName}
                  </h5>
                  <p>{item.text}</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCard>
        );
      })}
      <IonInfiniteScroll
        onIonInfinite={loadData}
        threshold="100px"
        disabled={isInfiniteDisabled}
      >
        <IonInfiniteScrollContent
          loadingSpinner="bubbles"
          loadingText="Loading more data..."
        ></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </>
  );
}
