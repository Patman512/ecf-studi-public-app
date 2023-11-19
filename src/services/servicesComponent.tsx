import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import { Service } from './types';

interface ServicesComponentProps {
    services: Service[];
}

export const ServicesComponent: FC<ServicesComponentProps> = (props) => {
    const renderServices = (services: Service[]) => {
        return services.map((service) => {
            const { id, name, description } = service;

            return (
                <Card key={id} style={{ marginTop: '5px', marginBottom: '5px' }}>
                    <Card.Header>{name}</Card.Header>
                    <Card.Body>{description}</Card.Body>
                </Card>
            );
        });
    };

    return <>{renderServices(props.services)}</>;
};
