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
  IonTextarea,
} from '@ionic/react';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../env';
import { Storage } from '@capacitor/storage';

const PostDetails = ({ posts, comments }) => {
  const [showAlert] = useIonAlert();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState('');

  const sumbmitComment = async (e) => {
    e.preventDefault();
    const token = await Storage.get({ key: 'authTokens' });
    setLoading(true);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token.value,
    };

    await axios
      .post(
        `${BASE_URL}posts/${posts?.data?.data?.id}/comments`,
        { comments_text: commentText },
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
        }
        console.log('res =>', res);
      });
  };

  console.log('Commentshere =>', comments);

  return (
    <IonModal isOpen={true}>
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
              <p>{posts?.data?.data?.text}</p>
              <br />
            </IonLabel>
          </IonItem>
        </IonList>
        <hr />
        <IonList>
          <IonItem>
            <IonAvatar slot="start"></IonAvatar>
            <IonLabel>
              <h4 className="text-center">Comments</h4>
              {loading === false &&
                comments?.data?.data?.map((comment, i) => {
                  console.log('Comment =>', comment);
                  return (
                    <div key={i}>
                      <h5>{comment.comments_text}</h5>
                      <h6>By {comment.user.firstName}</h6>
                      <br />
                    </div>
                  );
                })}
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonTextarea
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Post a comment"
              rows={5}
              value={commentText}
              cols={70}
            ></IonTextarea>
          </IonItem>
        </IonList>
      </IonCard>

      <IonGrid>
        <IonRow>
          <IonItemDivider>
            <IonCol>
              <IonButton
                expand="expand"
                onClick={() => (window.location = '/dashboard')}
              >
                cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton type="submit" expand="expand" onClick={sumbmitComment}>
                Submit
              </IonButton>
            </IonCol>
          </IonItemDivider>
        </IonRow>
      </IonGrid>
    </IonModal>
  );
};

export default PostDetails;
