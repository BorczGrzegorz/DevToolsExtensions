import React, { useEffect } from 'react';
import { ProductSelectionList } from './ProductSelection/ProductSelectionList';
import { LoadingPage } from './LoadingPae';
import { MachineStateList } from './MachinesStates/MachineStateList';
import { useDispatch, useSelector } from 'react-redux';
import { loadData } from '../actions/actions';
import { AppState, ProductDictionary } from './../models/AppState';
import { Route, useHistory } from 'react-router';
import { ChangeProductSelection } from './ProductSelection/ChangeProductSelection';
import { ErrorPage } from './ErrorPage';

export const Root = () => {
    const dispatch = useDispatch();
    const lastSelectedProject = useSelector<AppState>(x => x.lastSelectedProject);
    const error = useSelector<AppState, Error | null>(x => x.error);
    const products = useSelector<AppState, ProductDictionary>(x => x.products);
    const history = useHistory();

    useEffect(() => {
        dispatch(loadData());
        history.push(`/${lastSelectedProject}`);
    }, []);

    if(error){
        return <ErrorPage error={error}/>
    }

    if (Object.keys(products).length === 0) {
        return <LoadingPage />
    }

    return (
        <>
            <Route exact path='/' component={ProductSelectionList} />
            <Route exact path='/:projectKey' component={ChangeProductSelection}/>
            <Route exact path='/:projectKey' component={MachineStateList} />
        </>);
}