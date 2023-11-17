import React, { FC } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Service } from './types';

interface ServicesComponentProps {
    services: Service[];
}

export const ServicesComponent: FC<ServicesComponentProps> = (props) => {
    const renderServices = (services: Service[]) => {
        return services.map((service) => {
            const { id, name, description } = service;

            return (
                <Accordion.Item key={id} eventKey={id.toString()}>
                    <Accordion.Header>{name}</Accordion.Header>
                    <Accordion.Body>{description}</Accordion.Body>
                </Accordion.Item>
            );
        });
    };

    return (
        <>
            <Card bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Card.Header>
                    <Card.Title style={{ textAlign: 'center' }}>Services</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Accordion style={{ marginTop: '10px', marginBottom: '10px' }}>
                        {renderServices(props.services)}
                    </Accordion>
                </Card.Body>
            </Card>
        </>
    );
};
