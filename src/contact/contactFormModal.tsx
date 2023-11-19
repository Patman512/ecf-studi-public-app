import React, { FC, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { sendEmail } from './api';
import { SendEmailParams } from './types';

interface ContactFormModalProps {
    onClose: () => void;
    onSave: () => void;
    onError: (error: Error) => void;
    carOfferTitle?: string;
}

export const ContactFormModal: FC<ContactFormModalProps> = (props) => {
    const [formData, setFormData] = useState<SendEmailParams>({
        lastName: '',
        firstName: '',
        email: '',
        phone: 0,
        message: ''
    });

    const changeHandler = (event: any) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    const submitHandler = () => {
        formData.phone = Number(formData.phone);
        formData.carOfferTitle = props.carOfferTitle ?? undefined;

        sendEmail(formData, (error) => {
            if (error) {
                return props.onError(error);
            }

            props.onSave();
            return props.onClose();
        });
    };

    const canSubmit = () => {
        const formDataKeys = Object.keys(formData);

        return formDataKeys.every((key) => formData[key].length);
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Envoyer un message au garage</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card key={'sendEmail'} bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Card.Header>{props.carOfferTitle ? `Sujet: ${props.carOfferTitle}` : 'Sujet général'}</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control type="text" name="lastName" onChange={changeHandler} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control type="text" name="firstName" onChange={changeHandler} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Adresse email</Form.Label>
                                <Form.Control type="email" name="email" onChange={changeHandler} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Numéro de téléphone</Form.Label>
                                <Form.Control type="phone" name="phone" onChange={changeHandler} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Message</Form.Label>
                                <Form.Control type="text" name="message" onChange={changeHandler} as="textarea" />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={submitHandler}
                    disabled={!canSubmit()}
                    variant="success"
                    style={{ marginRight: '10px' }}
                >
                    Envoyer
                </Button>
                <Button onClick={props.onClose} variant="secondary">
                    Fermer
                </Button>
            </Modal.Footer>
        </>
    );
};
