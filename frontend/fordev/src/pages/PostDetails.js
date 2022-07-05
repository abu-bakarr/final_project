/* eslint-disable react-hooks/exhaustive-deps */
import {
  IonButton,
  IonRow,
  IonItem,
  IonModal,
  IonList,
  IonCard,
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
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../env';
import { Storage } from '@capacitor/storage';
import { useForm } from 'react-hook-form';
import IonInputController from '../components/IonInputController';
import { useHistory } from 'react-router';

const PostDetails = ({ posts, comments }) => {
  const [showAlert] = useIonAlert();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const initialValue = {
    comments_text: '',
  };
  const loadData = () => {
    posts.length > 5 ? setInfiniteDisabled(true) : setInfiniteDisabled(false);
  };

  const { handleSubmit, reset, control } = useForm({
    defaultValues: initialValue,
  });

  const onSubmit = async (data) => {
    const token = await Storage.get({ key: 'authTokens' });
    setLoading(true);

    const Comment = {
      comments_text: data.comments_text,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token.value,
    };

    await axios
      .post(
        `${BASE_URL}posts/${posts?.data?.data?.id}/comments`,
        JSON.stringify(Comment),
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          showAlert({
            header: 'sucess',
            message: 'You successfully add comment',
            buttons: [{ text: 'Ok' }],
          });
          reset(initialValue);
          history.replace('/dashboard');
        }
      });
  };

  console.log('Commentshere =>', comments);

  return (
    <IonModal isOpen={true}>
      <IonHeader>
        <IonToolbar className="bg-color" style={{ color: '#fff' }}>
          <IonButtons slot="start">
            <IonBackButton
              onClick={(e) => {
                history.push('/dashboard');
              }}
            >
              {' '}
              Back
            </IonBackButton>
          </IonButtons>
          <IonTitle className="text-center text-sm"></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={loading} message={'Please Wait...'} duration={0} />
        <IonCard>
          <IonList>
            <IonItem>
              <IonAvatar slot="start"></IonAvatar>
              <IonLabel>
                <h2>
                  <strong>{posts?.data?.data?.name}</strong>
                </h2>
                <h5>
                  By: {posts?.data?.data?.user.firstName}{' '}
                  {posts?.data?.data?.user.lastName}
                </h5>
                <p>{posts?.data?.data?.text}</p>
                <br />
              </IonLabel>
            </IonItem>
          </IonList>
          <IonList>
            <IonItem>
              <IonAvatar slot="start"></IonAvatar>
              <IonLabel>
                <h4 className="text-center">Comments</h4>
                {loading === false &&
                  comments?.data?.data?.map((comment, i) => {
                    console.log('Comment =>', comment.comments_text);
                    return (
                      <div key={i}>
                        <h5>{comment?.comments_text}</h5>
                        <h6>By {comment?.user?.firstName}</h6>
                        <br />
                      </div>
                    );
                  })}
              </IonLabel>
            </IonItem>
          </IonList>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonGrid>
              <IonRow>
                <IonCol size-sm="12" size-md="12">
                  <IonItem>
                    <IonLabel
                      className="text-sm pb-5 text-black-700"
                      position="floating"
                    >
                      Add Comment:
                    </IonLabel>
                    <IonInputController
                      name="comments_text"
                      control={control}
                      placeholder="Post your comment here"
                      type="text"
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonGrid>
                <IonRow>
                  <IonItemDivider>
                    <IonCol>
                      <IonButton
                        expand="expand"
                        onClick={() => (window.location = '/dashboard')}
                      >
                        Back
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton type="submit" expand="expand">
                        Submit
                      </IonButton>
                    </IonCol>
                  </IonItemDivider>
                </IonRow>
              </IonGrid>
            </IonGrid>
          </form>
        </IonCard>

        <IonInfiniteScroll
          onIonInfinite={loadData}
          threshold="100px"
          disabled={isInfiniteDisabled}
        >
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more comments..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonModal>
  );
};

export default PostDetails;
