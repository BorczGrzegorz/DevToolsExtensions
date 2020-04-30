import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState, ProductDictionary } from './../../models/AppState';
import { useParams, useHistory } from 'react-router';
import { styled, Button } from '@material-ui/core';

const GradientButton = styled(Button)({
    color: 'white',
    height: 48,
    border: 0,
    borderRadius: 3,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    minWidth: '100%'
});

export const ChangeProductSelection = () => {
    const products = useSelector<AppState, ProductDictionary>(x => x.products);
    const { projectKey } = useParams();
    const history = useHistory();

    const onClick = () => {
        history.push('/');
    }

    return (
        <>
            {Object.keys(products).length === 0 ? null : <GradientButton onClick={onClick}>{projectKey}</GradientButton>}
        </>
    )
}