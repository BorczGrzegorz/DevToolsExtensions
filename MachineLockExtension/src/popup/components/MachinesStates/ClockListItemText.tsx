import * as React from 'react';
import moment from 'moment';
import { ListItemText } from '@material-ui/core';

export interface ClockListItemTextProps {
    devName: string;
    lockedDate: Date
}

const timeRemaining = () => {
    const time = new Date();
    return 1000 - time.getMilliseconds();
}

export const ClockListItemText = ({ devName, lockedDate }: ClockListItemTextProps) => {

    const getTime = (): string => {
        const locked = new Date(lockedDate);
        locked.setMilliseconds(0);
        const then: moment.Moment = moment(locked);
        const now = moment.utc();
        const diff = now.diff(then);
        return moment.utc(diff).format("HH:mm:ss");
    }

    const [timeText, setTimeText] = React.useState<string>(getTime());

    React.useEffect(() => {
            const interval = setInterval(() => {
                setTimeText(getTime());
            }, 100);

        return () => clearInterval(interval);
    }, [])

    return (
        <ListItemText primary={devName} secondary={timeText} />
    )
}