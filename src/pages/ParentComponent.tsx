import React from 'react';
import { Redirect } from 'react-router-dom';

// importing the ionic frame work components
import { IonMenuToggle, IonToast, IonSelect, IonSelectOption, IonPopover, IonList, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonContent, IonRouterOutlet, IonItem, IonButton, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonText} from '@ionic/react';
import { triangle, ellipse, square, calendar, personCircle, map, informationCircle, calendarNumber, earth, person, personAddOutline, personOutline, ellipsisVertical } from 'ionicons/icons';
import { Route } from 'react-router-dom';
import {useState} from 'react';
// Import the Event routes
import Events from './Events';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

// import css file

const ParentComponent: React.FC = () => {
    const [showPopover, setShowPopover] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // setting the selected option
    const [selectedOption, setSelectedOption] = useState('Option 1');

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        console.log(option);
        
        setShowToast(true)
        setShowPopover(false);
        };
    return (
        <IonPage>
            <IonHeader color='primary' style={{margin: '0px 0px 10px 0px'}} mode='md'>
                <IonToolbar color={"primary"} mode='md'>
                    <IonButtons slot='start'>
                        <IonMenuButton disabled={false} autoHide={false} id='main'></IonMenuButton>
                    </IonButtons>
                    <IonTitle style={{color:'white'}}>Events</IonTitle>
                    <IonButton id='popover-button' slot='end' onClick={() => setShowPopover(true)}><IonIcon icon={ellipsisVertical}></IonIcon></IonButton>
        
                    <IonPopover trigger="popover-button" isOpen={showPopover} onDidDismiss={() => setShowPopover(false)}>
                        <IonContent>
                            <IonList>
                                <IonItem button onClick={() => handleOptionClick("Today's events")}>
                                    Today's events
                                </IonItem>
                                <IonItem id="nested-trigger">
                                    Filter items by era
                                </IonItem>
                            <IonPopover className='mt-5' trigger="nested-trigger" dismissOnSelect={true} side="end">
                                <IonContent >
                                    <IonList>
                                        <IonItem button onClick={() => handleOptionClick('A.C.')}>
                                            A.C.
                                        </IonItem>
                                        <IonItem button onClick={() => handleOptionClick('B.C.')}>
                                            B.C.
                                        </IonItem>
                                        <IonItem button onClick={() => handleOptionClick('All events')}>
                                            All events
                                        </IonItem>
        
                                        </IonList>
                                    </IonContent>
                                </IonPopover>
                            </IonList>
                        </IonContent>
                    </IonPopover>
                </IonToolbar>
            </IonHeader>
            {/* <IonPage>
                <IonContent > */}
                    <p>This is the content</p>
                    <IonTabs className='tabs'>
                    <IonRouterOutlet>
                        <Route exact path="/app/tabs/all">
                            <Events selectedOption={selectedOption}/>
                        </Route>
                        <Route exact path="/app/tabs/1">
                            <Tab2 />
                        </Route>
                        <Route path="/app/tabs/3">
                            <Tab3 />
                        </Route>
                    </IonRouterOutlet>
                        <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/app/tabs/all">
                            <IonIcon aria-hidden="true" icon={triangle} />
                            <IonLabel>Tab 1</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/app/tabs/1">
                            <IonIcon aria-hidden="true" icon={ellipse} />
                            <IonLabel>Tab 2</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/app/tabs/3">
                            <IonIcon aria-hidden="true" icon={square} />
                            <IonLabel>Tab 3</IonLabel>
                        </IonTabButton>
                        </IonTabBar>
                        {
                        selectedOption === "B.C." || selectedOption === "A.C."?
                        <IonToast
                        position='bottom'
                        color={'light'}
                        isOpen={showToast}
                        message={`Filtered era: ${selectedOption}`}
                        duration={2000}
                        onDidDismiss={() => setShowToast(false)}
                        />
                        :
                        selectedOption === "All events"?
                        <IonToast
                            position='bottom'
                            color={'light'}
                            isOpen={showToast}
                            message={`${selectedOption}`}
                            duration={1000}
                            onDidDismiss={() => setShowToast(false)}
                        />
                        :
                        null
                    }
                </IonTabs>
                            {/* </IonContent>
            </IonPage> */}
    </IonPage>
    )
};

export default ParentComponent;