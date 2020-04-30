import { Notification } from './../../models/Notifications';
import { UserSummary } from './UserSummary';
import { Settings } from '../../models/Settings';

export interface OptionsAppState {
    settings: Settings,
    userSummary: UserSummary | null,
    error: Error | null,
    notifications: Notification[]
}