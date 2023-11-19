import React, { FC } from 'react';
import { OpeningHour } from './types';

interface OpeningHoursComponentProps {
    openingHours: OpeningHour[];
}

export const OpeningHoursComponent: FC<OpeningHoursComponentProps> = (props) => {
    const renderListItems = (openingHours: OpeningHour[]) => {
        return openingHours.map((openingHour) => {
            const { id, dayOfWeek, openingTime, closingTime, breakStartTime, breakEndTime } = openingHour;

            if (!openingTime) {
                return (
                    <li key={id} style={{ listStyleType: 'none' }}>
                        <strong>{dayOfWeek}:</strong> Fermé.
                    </li>
                );
            }

            return (
                <li key={id} style={{ listStyleType: 'none' }}>
                    <strong>{dayOfWeek}:</strong> ouvert de {openingTime} à{' '}
                    {breakStartTime ? `${breakStartTime} puis de ${breakEndTime} à ${closingTime}` : `${closingTime}`}.
                </li>
            );
        });
    };

    return <ul>{renderListItems(props.openingHours)}</ul>;
};
