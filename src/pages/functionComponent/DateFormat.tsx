import {useEffect, useState} from 'react';
import { IonPopover, IonList, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonContent, IonRouterOutlet, IonItem, IonButton, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonText } from '@ionic/react';

import axios from 'axios';

interface Props {
    event_trigger_date: string;
    year: string;
    month: string;
    day: string;
    }

    function getMonthName(month:string) {
        switch(parseInt(month)) {
        case 1:
            return 'Janar';
        case 2:
            return 'Shkurt';
        case 3:
            return 'Mars';
        case 4:
            return 'Prill';
        case 5:
            return 'Maj';
        case 6:
            return 'Qershor';
        case 7:
            return 'Korrik';
        case 8:
            return 'Gusht';
        case 9:
            return 'Shtator';
        case 10:
            return 'Tetor';
        case 11:
            return 'Nentor';
        case 12:
            return 'Dhjetor';
        default:
            return 'Invalid month value';
        }
    }
    function getMonthNameTrigger(month:string) {
        console.log(month,'this is the eventTriggerDate month variable');

        switch (parseInt(month)) {
            case 1:
                return 'Janar';
            case 2:
                return 'Shkurt';
            case 3:
                return 'Mars';
            case 4:
                return 'Prill';
            case 5:
                return 'Maj';
            case 6:
                return 'Qershor';
            case 7:
                return 'Korrik';
            case 8:
                return 'Gusht';
            case 9:
                return 'Shtator';
            case 10:
                return 'Tetor';
            case 11:
                return 'Nentor';
            case 12:
                return 'Dhjetor';
            default:
                return 'Invalid month value';
            }   
    }
    
const DateFormat: React.FC<Props> = ({event_trigger_date, year, month, day}) => {
    // defined the string that we will coditionally render acciording to what information we 
    // get from the DateFormat Props
    const [formatedDate, setFormatedDate] = useState('');
    const [monthName, setMonthName] = useState('');

    const newMonthName = getMonthName(month);
    // Check if the new month name is different from the current month name
    if (newMonthName !== monthName) {
      // Update the month name only if it has changed
        setMonthName(newMonthName);
    }

    // if we have event_trigger_date, got to split the event trigger date
    // split it to year month and day
    useEffect(() => {
        if(event_trigger_date){
            let yearFunction = ''
            let monthFunction = ''
            let dayFunction = ''
            // first of split the date which is formated as
            // '2018-12-12' into 2018 12 12

            // split the event_trigger)date to 3 strings. split it by the 
            // '-' which seperates the year month and day
            const dateParts = event_trigger_date.split('-')

            yearFunction = dateParts[0];
            monthFunction = dateParts[1];
            dayFunction = dateParts[2];

            // Since the dayFunction is like this "02"
            // i want the day to be displayed like this: "2"
            const newDay = parseInt(dayFunction);

            // function to get the name of the month
            const newMonthNameTrigger = getMonthNameTrigger(monthFunction);

            setFormatedDate(`${newDay} ${newMonthNameTrigger}, ${yearFunction}`)

            // console.log(moment().format('LLLL'))
            // moment.locale('al')
            // test to see how the formated date could have been done with just moment.js
            // const testDate = '2000/12/12'
            // const newDate = moment(testDate).format('MMMM Do YYYY');
            // console.log(newDate, 'this is the formated date');
        }
        if(year && month && day){
            setFormatedDate(`${day} ${monthName}, ${year}`)
        }
        if(year && month === null && day === null){
            setFormatedDate(`${year}`)
        }
        if(year === null && month && day){
            setFormatedDate(`${day} ${monthName}`)
        }
        console.log(monthName)
    }, [])


    return (
        <p><strong>{formatedDate}</strong></p>
    );
};

export default DateFormat;
