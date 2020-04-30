import * as React from 'react';
import { styled, Button, Grid } from '@material-ui/core';

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

export interface ProductSelectionListProps {
    products: {
        name: string
    }[],
    onSelectProduct: (productName: string) => void
}

export const ProductSelectionList = ({products, onSelectProduct}: ProductSelectionListProps) => {
    console.log("render");
    return (
        <Container container
            direction='column'
            alignItems='center'
            justify='center'>
            {
                products.map(item => (
                    <GradientButton key={item.name} onClick={() => onSelectProduct(item.name)}>{item.name}</GradientButton>
                ))
            }
        </Container>
    )
}