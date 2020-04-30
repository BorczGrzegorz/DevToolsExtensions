import * as React from 'react';
import { styled, Button } from '@material-ui/core';

const GradientButton = styled(Button)({
    color: 'white',
    height: 48,
    border: 0,
    borderRadius: 3,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    minWidth: '100%'
});

export interface ChangeProductSelectionProps {
    text: string;
    onClick: () => void
}

export const ChangeProductSelection = ({text, onClick} : ChangeProductSelectionProps) => {
    return (
        <>
            <GradientButton onClick={onClick}>{text}</GradientButton>
        </>
    )
}