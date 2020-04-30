import { Guid } from "guid-typescript";

interface NotificationOptions {
    type: string,
    title: string,
    message: string,
    iconUrl: string,
    priority: number,
    requireInteraction?: boolean,
    buttons?: {
        title: string
    }[]
}

const createOptions = (props: PushNotificationProps): NotificationOptions => {
    const buttons = []

    if(props.firstButton){
        buttons.push({ title: props.firstButton.title});
    }

    if(props.secondButton){
        buttons.push({ title: props.secondButton.title});
    }

    const options = {
        type: 'basic',
        title: props.title,
        message: props.message,
        iconUrl: "jira128.png",
        requireInteraction: true,
        priority: 2,
        buttons
    }

    return options;
}

export interface ButtonProps {
    title: string,
    onClick: (source: PushNotification) => void
}

export interface PushNotificationProps {
    onAreaClick?: (source: PushNotification) => void;
    title: string;
    message: string;
    firstButton?: ButtonProps;
    secondButton?: ButtonProps | null;
}

export class PushNotification {
    private options: NotificationOptions;
    private props: PushNotificationProps;
    public id: string;

    constructor(props: PushNotificationProps) {
        chrome.notifications.onButtonClicked.addListener(this.clickHandler);
        chrome.notifications.onClicked.addListener(this.areaClickHandler);
        chrome.notifications.onClosed.addListener(this.dispose);
        this.options = createOptions(props);
        this.props = props;
        this.id = Guid.create().toString();
        chrome.notifications.create(this.id, this.options);
    }

    private clickHandler = async (id: string, btnIdx: number) => {
        if (this.id === id) {
            if (btnIdx === 0 && this.props.firstButton) {
                this.props.firstButton.onClick(this);
            }
            else if (btnIdx === 1 && this.props.secondButton) {
                this.props.secondButton.onClick(this);
            }
        }
    }

    private areaClickHandler = () => {
        if (this.props.onAreaClick) {
            this.props.onAreaClick(this);
        }
    }

    public dispose = () => {
        chrome.notifications.onButtonClicked.removeListener(this.clickHandler);
        chrome.notifications.onClicked.removeListener(this.areaClickHandler);
        chrome.notifications.onClosed.removeListener(this.dispose);
    }
}
