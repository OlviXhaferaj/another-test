import {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import {
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonMenuButton, 
    IonButtons,
    IonList,
    IonItem,
    IonCard,
    IonImg,
    IonCardContent,
    IonText,
    IonSpinner,
    IonButton
} from '@ionic/react';

import './Events.css';
import axios from 'axios';
import DateFormat from './functionComponent/DateFormat';
import Menu from './Menu';


interface Props {
    description: string;
    }

    // this is the function which gets the description 
    // and also the number containing how many words should the description be
    const truncateWords = (text: string, limit: number) => {
        // words here are the description which is split in words
        const words = text.split(" ");
        // if words are less than the limit, the text is returned
        if (words.length <= limit) {
        return text;
        }
        // if the words are not less than the limit
        // we get the words untill the allowed limit and then 
        // cut of the other words
        const truncated = words.slice(0, limit);
        // returning to the function call the string with the splited 
        // words
        return `${truncated.join(" ")}...`;
    };
    // we get from the react component the description
    const ItemDescription: React.FC<Props> = ({ description }) => {
        // the description is passed to the truncateWords function along with the limit of words
        const truncatedDescription = truncateWords(description, 20);

        const itemDescription = truncatedDescription.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&gt;/g, ' ');
        // after we get the words from function, we return this description
        return (
            <IonText className='font-weight-normal fs-4'>
                <p dangerouslySetInnerHTML={{ __html: itemDescription }} />
            </IonText>
        );
    };

interface EventsProps {
    selectedOption: string;
    }

const Events: React.FC<EventsProps> = ({selectedOption}) => {
    const location = useLocation();

    const [events, setEvents] = useState<any[]>([])
    const [selectedEvent, setSelectedEvent] = useState(false);
    const [selectedId, setSelectedId] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [epoce, setEpoce] = useState('');
    const [date, setDate] = useState('');
    const [when, setWhen] = useState(0);
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);

    // variable to store the name of the weekDay
    const [weekDay, setWeekDay] = useState('');
    const [isKnown, setIsKnown] = useState(false);

    // the function .replace is there to remove the html tags.
    const itemDescription = description.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replaceAll(/&nbsp;/g, ' ')

    // variable to see if the data has been fetched or not
    const [isLoading, setIsLoading] = useState(true);

    // function to get all the events from the database
    useEffect(() => {
        if(location.pathname === '/app/tabs/all'){
            axios.get('https://kalendari.cargoflags.com/api/auth/events')
        .then((res) => {
            setEvents(res.data.data); 
            console.log(res.data.data);      
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    },[location])

    // Function to find how many years before an event happened
    // and find the weekDay
    useEffect(() => {
        if(date !== null){
            console.log('in the use effect')
            setWeekDay('');
            setIsKnown(true);
            const currentYear = new Date().getFullYear();

            let fullDate 
            let time = date.toString();
            console.log(time);
            if (time.length > 4) {
                console.log('this is event_trigger_date')
                
                let newDate = new Date(time);
                let dayOfWeek = newDate.getDay();
                
                switch(dayOfWeek){
                    case 0:
                        setWeekDay("Sunday")
                        break;
                    case 1:
                        setWeekDay("Monday")
                    break;
                    case 2:
                        setWeekDay("Tusday")
                    break;
                    case 3:
                        setWeekDay("Wednesday")
                    break;
                    case 4:
                        setWeekDay("Thursday")
                    break;
                    case 5:
                        setWeekDay("Friday")
                    break;
                    case 6:
                        setWeekDay("Saturday")
                    break;
                    default:
                        setWeekDay("unknown");
                }
                time.substring(0, 4);   
            }
            // this is the function where i get the year, month and day into one date
            // here i find what day it was in a certain date 
            // if i dont have the date which is set as time and the month and day,
            // i cant find the day
            if(time.length === 4 && month && day){
                console.log('this is date month and day')
                setIsKnown(true);
                fullDate = `${year}/${month}/${day}`
                
                let newDate = new Date(fullDate);
                let dayOfWeek = newDate.getDay();
                
                switch(dayOfWeek){
                    case 0:
                        setWeekDay("Sunday")
                        break;
                    case 1:
                        setWeekDay("Monday")
                    break;
                    case 2:
                        setWeekDay("Tusday")
                    break;
                    case 3:
                        setWeekDay("Wednesday")
                    break;
                    case 4:
                        setWeekDay("Thursday")
                    break;
                    case 5:
                        setWeekDay("Friday")
                    break;
                    case 6:
                        setWeekDay("Saturday")
                    break;
                    default:
                        setWeekDay("unknown");
                }
            }
            const num = parseInt(time);
            setYear(num);
            const when = currentYear - num;
            setWhen(when);
        }else {
            setWeekDay("exact date unknown");
            setIsKnown(false);
        }
    }, [date, month, day])

    let filteredEvents = events;

    // useEffect(() => {
        let currentDate = new Date();
        const offsetInMs = -60 * 60 * 1000; // convert offset to milliseconds
        const utcDate = new Date(currentDate.getTime() + offsetInMs);
        const currentDay = utcDate.getUTCDate();
        const currentMonth = currentDate.getMonth()+1;
        console.log(currentDay, 'this is the currentDay');
        console.log(currentMonth, 'this is month')

        filteredEvents = events.filter(event =>{
            if(event.event_trigger_date !==null){
                const eventMonth = event.event_trigger_date.split('-')[1]; // get the event month by spliting the event_trigger_date
                console.log(eventMonth)
                const eventDay = event.event_trigger_date.split('-')[2]; // get the event day by spliting the event_trigger_date

                // set the eventMonth and eventDay variables to number so they can be compared to currentMonth and CurrentDay
                const numberedMonth = parseInt(eventMonth);
                const numberedDay = parseInt(eventDay);

                return numberedMonth === currentMonth && numberedDay === currentDay
            }
            if(event.month !== null && event.day !== null){
                const eventMonth = event.month; // get the event month by spliting the event_trigger_date
                console.log(eventMonth)
                const eventDay = event.day; // get the event day by spliting the event_trigger_date

                // set the eventMonth and eventDay variables to number so they can be compared to currentMonth and CurrentDay
                const numberedMonth = parseInt(eventMonth);
                const numberedDay = parseInt(eventDay);

                return numberedMonth === currentMonth && numberedDay === currentDay
            }
        });
        console.log(filteredEvents, 'filtered events');
    // }, [])

    // Here i define the filteredEvents variable which is set to events
    // conditionally filter events with the selected Option
    if (selectedOption === "A.C.") {
        filteredEvents = events.filter(event =>  event.epoce === 'AC');
    } else if (selectedOption === "B.C.") {
        filteredEvents = events.filter(event => event.epoce === "BC");
    } else if (selectedOption === "All events") {
        filteredEvents = events;
    }



    return (
        <IonPage>
        
        {
            isLoading === true?(
                <div className="d-flex justify-content-center align-items-center pt-5 mt-5">
                    <IonSpinner  name="bubbles" color="primary"  />
                </div>
            ):
            <IonContent fullscreen>
                <div className='content-container'>
                    <IonList mode='ios' className='ion-no-padding'>
                        {
                            filteredEvents.map((item, index) => (
                                <IonItem key={'card-' + item.id} mode='ios' lines='none' class="ion-no-padding ion-no-inner-padding">
                                    <IonCard className='ion-no-padding' onClick={(e) => {
                                    
                                        {setSelectedEvent(true); 
                                        setSelectedId(item.id); 
                                        setName(item.name);
                                        setDescription(item.description);
                                        setImage(item.image); 
                                        setEpoce(item.epoce); 
                                        if(item.event_trigger_date){
                                            setDate(item.event_trigger_date)
                                            }else{
                                                setDate(item.year)
                                                setYear(item.year);
                                                setMonth(item.month);
                                                setDay(item.day)
                                                }
                                            }
                                        }
                                    }>
                                        <div className="card-content" >
                                            <div >
                                                <IonImg className="card-image" src={'http://kalendari.cargoflags.com/images/'+item.image}/>
                                            </div>
                                            <IonCardContent>
                                                <div 
                                                className="title-container"
                                            >

                                                <div className='d-flex justify-content-between'>
                                                    <DateFormat event_trigger_date={item.event_trigger_date} year={item.year} month={item.month} day={item.day}></DateFormat>
                                                    <p>Era: {item.epoce}</p>
                                                </div>

                                                <IonText className='mt-4' style={{color:'black', fontSize:"1.4rem"}}>{item.name}</IonText><br/>
                                                {
                                                    item.description.length>0?
                                                    <p className='text-size-3 mt-2'>
                                                        <ItemDescription description={item.description} /> click to show more
                                                    </p>
                                                    :
                                                        <ItemDescription description={item.description} />
                                                }
                                                </div>
                                            </IonCardContent>
                                        </div>
                                    </IonCard>
                                </IonItem>
                            ))
                        }
                    </IonList>
                    {
                        selectedId && selectedEvent?
                        <div
                            key={selectedId}
                            className={`${selectedEvent === true ? "popup-container" : "popup-container-fade-out"}`}
                            onClick={() => {
                                setSelectedEvent(false);
                            }}
                        >
                            <div >
                                <IonImg src={'https://kalendari.cargoflags.com/images/'+image} />
                            </div>
                            <div>   
                                <IonText>
                                        {
                                            when > 0 && isKnown !==false?
                                            <div className='d-flex justify-content-between'>
                                                <p className='mt-3 mb-2'><strong><span>{year}</span></strong> {when} years ago</p>
                                                <p className='mt-3 text-dark'>{weekDay}</p>
                                            </div>
                                        :
                                            when === 0 && isKnown !==false?
                                            <div className='d-flex justify-content-between'>
                                                <p className='mt-3 mb-2' ><strong><span>{year}</span></strong> Current year</p>
                                                <p className='mt-3 text-dark'>{weekDay}</p>
                                            </div>
                                        :
                                            <div className='d-flex justify-content-between'>
                                                {/* <p className='mt-3 mb-2' ><strong><span>{year}</span></strong> Current year</p> */}
                                                <p className='mt-3 text-dark'>{weekDay}</p>
                                            </div>                                       
                                        }
                                    <p className='mt-2 text' style={{fontSize:"1.4rem"}} ><strong>{name}</strong></p>
                                </IonText>
                            </div>
                            <div>
                                <IonText>
                                  <p dangerouslySetInnerHTML={{ __html: itemDescription }} />
                                </IonText>
                            </div>
                        </div>              
                        : null
                    }
                        </div>
                </IonContent>
            }
        </IonPage>
    );
};

export default Events;
