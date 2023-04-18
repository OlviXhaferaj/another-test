import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { 
    IonContent, 
    IonHeader, 
    IonMenu, 
    IonPage, 
    IonRouterOutlet, 
    IonSplitPane, 
    IonTitle, 
    IonToolbar, 
    IonMenuToggle,
    IonItem, 
    IonIcon,
    IonButton,
} from '@ionic/react';
// import axios from 'axios';


// import Icons
import { homeOutline, newspaperOutline, logOutOutline, logInOutline, home, newspaper, trailSignOutline} from 'ionicons/icons';
// import Home from './Home';
import { Route } from 'react-router-dom';
import ParentComponent from './ParentComponent';

const Menu: React.FC = () => {
    const paths = [
        // {name: 'Home', url:'/app/home', icon:home},
        {name: 'Events', url:'/app/tabs/all', icon:newspaper}
    ]

    return (
        <IonPage>
            <IonSplitPane contentId='main'>
                <IonMenu type='push' hidden={false} contentId='main' >
                    <IonHeader color='primary'>
                        <IonToolbar className='toolbar-container'>
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {paths.map((item, index) => (
                            <IonMenuToggle key={index}>
                                <IonItem routerLink={item.url} routerDirection="none">
                                    <IonIcon icon={item.icon} slot="start"></IonIcon>
                                    {item.name}
                                </IonItem>
                            </IonMenuToggle>
                        ))}
                    </IonContent>
                </IonMenu>
                
                <IonRouterOutlet id="main">
                    <Route path="/app/tabs" component={ParentComponent}/>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    );
};

export default Menu;