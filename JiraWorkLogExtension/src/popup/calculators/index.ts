import { UserDatesWorklog, DateWorklog, UsersDateWorklog } from "../Models/UsersDateWorklog";
import moment from 'moment';
import _ from "lodash";

const getHoursString = (timeInSeconds: number) : number => moment.duration(timeInSeconds, 'seconds').asHours();

export const getUsersHours = (worklogs: UserDatesWorklog): number => {
    const spentTimeInAllIssues = _(Object.keys(worklogs)
                                .map(key => worklogs[key]))
                                .flatten()
                                .sumBy(x => x.timeSpentSeconds);

    return getHoursString(spentTimeInAllIssues);
}

export const getDateHours = (worklogs: DateWorklog[]) : number => {
    const spentTimeInAllIssues = _(worklogs)
                                .sumBy(x => x.timeSpentSeconds);
     return getHoursString(spentTimeInAllIssues);
}

export const getWholeHours = (worklogs: UsersDateWorklog) : number => {
    const spentTimeInAllIssues = _(Object.keys(worklogs).map(key => worklogs[key]))
                                 .flatMap<DateWorklog[]>(x => Object.keys(x).map(key => x[key]))
                                 .flatten()
                                 .sumBy(x => x.timeSpentSeconds);
                                 
     return getHoursString(spentTimeInAllIssues);
}