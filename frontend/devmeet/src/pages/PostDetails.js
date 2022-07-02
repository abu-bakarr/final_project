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
  IonTextarea,
} from '@ionic/react';
import { NavButtons } from '../components/NavButton';
import { useHistory } from 'react-router';

const PostDetails = ({ data }) => {
  const history = useHistory();

  console.log('data =>', data);
  const postComment = () => {
    return (
      <>
        <IonRow>
          <IonItemDivider>
            <IonItem>
              <IonLabel color="dark">Comment</IonLabel>
              <IonTextarea
                placeholder="Post a comment"
                rows={5}
                cols={70}
              ></IonTextarea>
            </IonItem>
          </IonItemDivider>
        </IonRow>
      </>
    );
  };

  return (
    <IonModal isOpen={true}>
      <IonCard>
        <IonList>
          <IonItem>
            <IonAvatar slot="start"></IonAvatar>
            <IonLabel>
              <h2>
                <strong>{data?.data?.data?.name}</strong>
              </h2>
              <h5>
                By: {data?.data?.data?.user.firstName}{' '}
                {data?.data?.data?.user.lastName}
              </h5>
              <p>{data?.data?.data?.text}</p>
              <br />
              <hr />
              {data?.data?.data?.comments.map((item) => {
                console.log('comments =>', item);
                return <p>{item.comments_text}</p>;
              })}
              <br />
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonTextarea
              placeholder="Post a comment"
              rows={5}
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
              <IonButton type="submit" expand="expand">
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
