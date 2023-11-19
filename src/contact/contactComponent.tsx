import React, { FC } from 'react';
import { Button } from 'react-bootstrap';

interface ContactComponentProps {
    onModalOpen: () => void;
}

export const ContactComponent: FC<ContactComponentProps> = (props) => {
    return (
        <>
            <p>
                Vous pouvez nous contacter par téléphone au 0123456789 ou nous envoyer un message en cliquant le bouton
                suivant.
            </p>
            <Button onClick={props.onModalOpen}>Envoyer un message</Button>
        </>
    );
};
