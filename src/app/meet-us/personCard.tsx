import React from 'react'
import { Card, CardSection, Image, Text, UnstyledButton } from '@mantine/core';
import { grabImage } from '@/lib/sanity-client';

const PersonCard = ({ person, onClick }: {
    person: {
        name: string,
        bio: string
        title: string,
        image: any
    },
    onClick: () => void
}) => {
    return (
        <Card >
            <UnstyledButton onClick={onClick}>
                <CardSection>
                        <Image
                            src={person.image.asset && grabImage(person.image)}
                            h={160}
                            alt={person.name}
                            onClick={onClick}
                        />
                </CardSection>
            </UnstyledButton>
            <Text fw={500} size="lg" mt="md">
                {person.name}
            </Text>

            <Text mt="xs" c="dimmed" size="sm">
                {person.title}
            </Text>
        </Card>
    )
}

export default PersonCard;