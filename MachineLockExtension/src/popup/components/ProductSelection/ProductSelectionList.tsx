import * as React from 'react';
import { styled, Button, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { AppState, ProductDictionary } from './../../models/AppState';
import { useHistory } from 'react-router';

const GradientButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    height: 48,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 7px 9px 5px rgba(255, 105, 135, .3)',
    marginTop: '10px',
    marginBottom: '10px',
    minWidth: '90px'
});

const Container = styled(Grid)({
    marginTop: '20px'
});


export const ProductSelectionList = () => {
    const products: ProductDictionary = useSelector<AppState, ProductDictionary>(x => x.products);
    const history = useHistory();

    const onSelectProduct = (productKey: string) => {
        history.push(`/${productKey}`);
    }

    return (
        <Container container
            direction='column'
            alignItems='center'
            justify='center'>
            {
                Object.keys(products).map(key => (
                    <GradientButton key={key} onClick={() => onSelectProduct(key)}>{products[key].name}</GradientButton>
                ))
            }
        </Container>
    )
}