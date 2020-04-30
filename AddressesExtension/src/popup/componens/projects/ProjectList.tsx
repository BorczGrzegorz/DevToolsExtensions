import * as React from 'react';
import { ProductDto } from '../../../api/devToolsApi';
import { ExpansionPanel, ExpansionPanelSummary, Typography, Grid, ExpansionPanelDetails } from '@material-ui/core';
import { AddressesExpansionPanel } from './AddressesExpansionPanel';
import { AddressesList } from './AddressesList';

export interface ProjectListProps {
    product: ProductDto
}

export const ProjectList = ({ product }: ProjectListProps) => {

    const [selected, setSelected] = React.useState('');

    const setExpanded = (name: string) => {
        if(selected === name){
            setSelected('');
            return;
        }

        setSelected(name);
    }

    return (
        <Grid container direction='column'>
            {product.projects.map(project => (
                <ExpansionPanel key={project.id} 
                                expanded={selected === project.name} >
                    <ExpansionPanelSummary onClick={() => setExpanded(project.name)}>
                        <Typography color='secondary'>{project.name}</Typography>
                    </ExpansionPanelSummary>
                    <AddressesList addresses={project.addresses} machines={product.machines}/>
                </ExpansionPanel>
            ))}
        </Grid>
    )
}