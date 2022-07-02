import {
  IonListHeader,
  IonCard,
  IonLabel,
  IonItem,
  IonAvatar,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonViewWillEnter,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

export default function Posts({ posts }) {
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const history = useHistory();
  const data = useParams();

  useEffect(() => {
    const loadData = () => {
      posts.length > 10
        ? setInfiniteDisabled(true)
        : setInfiniteDisabled(false);
    };
    loadData();
  });

  console.log('isInfiniteDisabled click =>', isInfiniteDisabled);

  const handleClick = (e) => {
    console.log('history click =>', history);
    console.log('useParams click =>');
  };
  useIonViewWillEnter(() => {
    posts;
  });

  return (
    <>
      <IonListHeader> Posts </IonListHeader>
      {posts.map((item) => (
        <>
          <IonCard key={item.id} onClick={handleClick}>
            <IonList>
              <IonItem>
                <IonAvatar slot="start"></IonAvatar>
                <IonLabel>
                  <h2>{item.user.name}</h2>
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCard>
        </>
      ))}
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
