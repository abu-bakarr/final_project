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

export default function Posts({ posts }) {
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const loadData = () => {
    posts.length > 10 ? setInfiniteDisabled(true) : setInfiniteDisabled(false);
  };
  console.log('isInfiniteDisabled click =>', isInfiniteDisabled);

  const handleClick = (e) => {};
  useIonViewWillEnter(() => {
    loadData();
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
