import { IonButton, IonMenuButton } from '@ionic/react';
import React, { useEffect, useState } from 'react';

export const NavButtons = () => {
  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 900 ? true : false,
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia('(min-width: 900px)');
    mediaQuery.addListener(setMQuery);

    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  // MediaQueryListEvent { isTrusted: true, media: "(min-width: 768px)", matches: true ...}
  console.log(mQuery.matches);

  return (
    <div>
      {mQuery && !mQuery.matches ? (
        <IonMenuButton />
      ) : (
        <>
          <IonButton routerLink={'/dashboard'}>Home </IonButton>
          <IonButton routerLink={'/profile'}>Profile</IonButton>
          <IonButton routerLink={'/about'}>Profile</IonButton>
          <IonButton routerLink={'/settings'}>Settings </IonButton>
        </>
      )}
    </div>
  );
};
