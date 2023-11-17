import React, { FC } from 'react';
import { Card, Table } from 'react-bootstrap';
import { OpeningHour } from './types';

interface OpeningHoursComponentProps {
    openingHours: OpeningHour[];
}

export const OpeningHoursComponent: FC<OpeningHoursComponentProps> = (props) => {
    const renderTableRows = (openingHours: OpeningHour[]) => {
        return openingHours.map((openingHour) => {
            const { id, dayOfWeek, openingTime, closingTime, breakStartTime, breakEndTime } = openingHour;

            if (!openingTime) {
                return;
            }

            return (
                <tr key={id}>
                    <td>{dayOfWeek}</td>
                    <td>
                        {openingTime} - {breakStartTime && breakEndTime ? `${breakStartTime}, ${breakEndTime} - ` : ''}
                        {closingTime}
                    </td>
                </tr>
            );
        });
    };

    return (
        <>
            <Card bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Card.Header>
                    <Card.Title style={{ textAlign: 'center' }}>Jours et heures d&apos;ouverture</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Jours d&apos;ouverture</th>
                                <th>Horaires</th>
                            </tr>
                        </thead>
                        <tbody>{renderTableRows(props.openingHours)}</tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
};
