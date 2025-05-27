'use client';

import React, { useState, useEffect } from 'react';
import {
    Container,
    Title,
    Stack,
    Group,
    Button,
    Paper,
    Text,
    Divider,
    Switch,
    Slider,
    TextInput,
    ActionIcon,
} from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { IconCopy, IconRefresh } from '@tabler/icons-react';
import ToolsActionsGrid from '@/components/ActionsGrid/ToolsActionsGrid';
import { notifications } from '@mantine/notifications';

interface PasswordGeneratorClientProps {
    lng: string;
}

const generatePassword = (
    length: number,
    includeNumbers: boolean,
    includeSymbols: boolean,
    includeUppercase: boolean,
    includeLowercase: boolean
): string => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (includeLowercase) chars += lowercase;
    if (includeUppercase) chars += uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    // If no options are selected, default to lowercase
    if (chars === '') chars = lowercase;

    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

const PasswordGeneratorClient: React.FC<PasswordGeneratorClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'tools');
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [passwordLength, setPasswordLength] = useState(12);
    const [password, setPassword] = useState('');

    const handleGenerate = () => {
        setPassword(generatePassword(
            passwordLength,
            includeNumbers,
            includeSymbols,
            includeUppercase,
            includeLowercase
        ));
    };

    // Generate password when component mounts
    useEffect(() => {
        handleGenerate();
    }, []);

    const handleCopy = async () => {
        if (password) {
            try {
                await navigator.clipboard.writeText(password);
                notifications.show({
                    title: t('password_generator.copy_success_title'),
                    message: t('password_generator.copy_success_message'),
                    color: 'green',
                });
            } catch (error) {
                notifications.show({
                    title: t('password_generator.copy_error_title'),
                    message: t('password_generator.copy_error_message'),
                    color: 'red',
                });
            }
        }
    };

    const handleOptionChange = (
        option: 'lowercase' | 'uppercase' | 'numbers' | 'symbols',
        checked: boolean
    ) => {
        // If trying to uncheck the last option, prevent it
        const currentOptions = {
            lowercase: includeLowercase,
            uppercase: includeUppercase,
            numbers: includeNumbers,
            symbols: includeSymbols,
        };
        currentOptions[option] = checked;

        const activeOptions = Object.values(currentOptions).filter(Boolean).length;
        if (activeOptions === 0) return;

        switch (option) {
            case 'lowercase':
                setIncludeLowercase(checked);
                break;
            case 'uppercase':
                setIncludeUppercase(checked);
                break;
            case 'numbers':
                setIncludeNumbers(checked);
                break;
            case 'symbols':
                setIncludeSymbols(checked);
                break;
        }
    };

    return (
        <Container size="md" mt="lg">
            <Title order={3} ta="center">{t('password_generator.title')}</Title>
            <Text ta="center" size="sm" c="dimmed" mt="xs">
                {t('password_generator.description')}
            </Text>

            <Stack gap="md" mt="md">
                <Paper withBorder shadow="sm" radius="md" p="md">
                    <Stack gap="md">
                        <Switch
                            label={t('password_generator.include_lowercase')}
                            checked={includeLowercase}
                            onChange={(event) => handleOptionChange('lowercase', event.currentTarget.checked)}
                        />
                        <Switch
                            label={t('password_generator.include_uppercase')}
                            checked={includeUppercase}
                            onChange={(event) => handleOptionChange('uppercase', event.currentTarget.checked)}
                        />
                        <Switch
                            label={t('password_generator.include_numbers')}
                            checked={includeNumbers}
                            onChange={(event) => handleOptionChange('numbers', event.currentTarget.checked)}
                        />
                        <Switch
                            label={t('password_generator.include_symbols')}
                            checked={includeSymbols}
                            onChange={(event) => handleOptionChange('symbols', event.currentTarget.checked)}
                        />
                        <Text size="sm" mb="xs">
                            {t('password_generator.length')}
                        </Text>
                        <Slider
                            mb="md"
                            value={passwordLength}
                            onChange={setPasswordLength}
                            min={8}
                            max={40}
                            step={1}
                            marks={[
                                { value: 8, label: '8' },
                                { value: 16, label: '16' },
                                { value: 24, label: '24' },
                                { value: 32, label: '32' },
                                { value: 40, label: '40' },
                            ]}
                        />
                    </Stack>
                </Paper>

                <Group justify="center">
                    <Button
                        leftSection={<IconRefresh size={16} />}
                        onClick={handleGenerate}
                    >
                        {t('password_generator.generate')}
                    </Button>
                </Group>

                <Paper withBorder shadow="sm" radius="md" p="md">
                    <Group>
                        <TextInput
                            value={password}
                            readOnly
                            style={{ flex: 1 }}
                        />
                        <ActionIcon
                            variant="light"
                            color="blue"
                            size="lg"
                            onClick={handleCopy}
                        >
                            <IconCopy size={16} />
                        </ActionIcon>
                    </Group>
                </Paper>
            </Stack>

            <Divider mt="md" />
            <Title order={3} mt="lg">{t('password_generator.how_to_use_title')}</Title>
            <Paper withBorder radius="md" p="md" mt="md">
                <Stack gap="xs">
                    {[0, 1, 2].map((index) => (
                        <Group key={index} wrap="nowrap" align="flex-start">
                            <Text fw={600} c="blue" size="sm" style={{ minWidth: '8px' }}>{index + 1}.</Text>
                            <Text size="sm" style={{ lineHeight: 1.6 }}>{t(`password_generator.how_to_use_steps.${index}`)}</Text>
                        </Group>
                    ))}
                </Stack>
            </Paper>

            <Title order={3} mt="lg">{t('password_generator.faq_title')}</Title>
            <Stack gap="md" mt="md">
                {[0, 1, 2, 3, 4].map((index) => (
                    <Paper key={index} p="md" withBorder radius="md">
                        <Text fw={600} size="sm" mb="xs" c="blue">
                            {t(`password_generator.faq.${index}.q`)}
                        </Text>
                        <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                            {t(`password_generator.faq.${index}.a`)}
                        </Text>
                    </Paper>
                ))}
            </Stack>

            <Title order={3} mt="lg">{t('explore_more_title')}</Title>
            <ToolsActionsGrid lng={lng} />
        </Container>
    );
};

export default PasswordGeneratorClient;
