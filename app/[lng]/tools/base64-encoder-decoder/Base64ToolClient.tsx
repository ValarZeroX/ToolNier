'use client';
import React, { useState } from 'react';
import { Container, Title, Textarea, Button, Stack, Group, Text } from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { IconArrowsDownUp } from '@tabler/icons-react';

interface Base64ToolClientProps {
    lng: string;
}

const Base64ToolClient: React.FC<Base64ToolClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'tools');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleEncode = () => {
        try {
            // Convert the string to a Uint8Array using UTF-8 encoding
            const encoder = new TextEncoder();
            const uint8Array = encoder.encode(input);
            // Convert the Uint8Array to a binary string
            let binaryString = '';
            uint8Array.forEach((byte) => {
                binaryString += String.fromCharCode(byte);
            });
            // Encode the binary string
            setOutput(btoa(binaryString));
        } catch (e) {
            // console.error("Base64 Encoding Error:", e);
            setOutput(t('base64.error'));
        }
    };

    const handleDecode = () => {
        try {
            // Decode the base64 string to a binary string
            const binaryString = atob(input);
            // Convert the binary string to a Uint8Array
            const uint8Array = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                uint8Array[i] = binaryString.charCodeAt(i);
            }
            // Convert the Uint8Array back to a string using UTF-8 decoding
            const decoder = new TextDecoder();
            setOutput(decoder.decode(uint8Array));
        } catch (e) {
            // console.error("Base64 Decoding Error:", e);
            setOutput(t('base64.error'));
        }
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
    };

    const handleSwap = () => {
        setInput(output);
        setOutput(input);
    };

    return (
        <Container size="xs" mt="lg">
            <Title order={3} ta="center">{t('base64.title')}</Title>
            <Text ta="center" size="sm" c="dimmed" mt="xs">
                {t('base64.description')}
            </Text>
            <Stack gap="md" mt="md">
                <Textarea
                    label={t('base64.input_label')}
                    placeholder={t('base64.input_placeholder')}
                    value={input}
                    onChange={(e) => setInput(e.currentTarget.value)}
                    autosize
                    minRows={5}
                    maxRows={10}
                />

                <Group justify="center">
                    <Button onClick={handleEncode}>{t('base64.encode')}</Button>
                    <Button onClick={handleDecode} variant="outline">{t('base64.decode')}</Button>
                    <Button onClick={handleSwap} variant="outline" leftSection={<IconArrowsDownUp size={16} />}>
                        {t('base64.swap')}
                    </Button>
                    <Button color="red" variant="outline" onClick={handleClear}>{t('base64.clear')}</Button>
                </Group>

                <Textarea
                    label={t('base64.output_label')}
                    value={output}
                    readOnly
                    autosize
                    minRows={5}
                    maxRows={10}
                />
            </Stack>
        </Container>
    );
};

export default Base64ToolClient;
