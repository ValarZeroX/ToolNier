'use client';
import React, { useState } from 'react';
import { Container, Title, Stack, Text, FileInput, Paper, Image, Textarea, Button, Group, Tabs, Tooltip, Alert } from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { IconUpload, IconTrash, IconCopy, IconDownload, IconInfoCircle } from '@tabler/icons-react';
import { useClipboard } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';

interface ImageBase64ToolClientProps {
    lng: string;
}

const ImageBase64ToolClient: React.FC<ImageBase64ToolClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'tools');
    const [file, setFile] = useState<File | null>(null);
    const [base64, setBase64] = useState<string>('');
    const clipboard = useClipboard({ timeout: 1000 });
    const [decodeInputBase64, setDecodeInputBase64] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string | null>('encode');

    const handleFileChange = (file: File | null) => {
        setFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setBase64('');
        }
    };

    const handleClear = () => {
        setFile(null);
        setBase64('');
        setDecodeInputBase64('');
    };

    const handleDownloadDecodedImage = () => {
        if (!decodeInputBase64) return;

        const match = decodeInputBase64.match(/^data:(image\/\w+);base64,(.+)$/);
        if (!match) {
            Notifications.show({
                title: t('image_base64.error_title'),
                message: t('image_base64.invalid_base64'),
                color: 'red',
            });
            return;
        }
        const contentType = match[1];
        const base64Data = match[2];

        try {
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: contentType });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            const extension = contentType.split('/')[1] || 'png';
            link.download = `decoded_image.${extension}`;
            link.click();
            URL.revokeObjectURL(link.href);
        } catch (e) {
            Notifications.show({
                title: t('image_base64.error_title'),
                message: t('image_base64.decode_error'),
                color: 'red',
            });
        }
    };

    return (
        <Container size="sm" mt="lg">
            <Title order={3} ta="center">{t('image_base64.title')}</Title>
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)} mt="md">
                <Tabs.List grow>
                    <Tabs.Tab value="encode" >{t('image_base64.encode_tab')}</Tabs.Tab>
                    <Tabs.Tab value="decode" >{t('image_base64.decode_tab')}</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="encode" pt="md">
                    <Stack gap="md" mt="md">
                        <Alert icon={<IconInfoCircle size={16} />} color="blue" variant="light" mt="md">
                            {t('image_base64.privacy_notice')}
                        </Alert>
                        <Text ta="center" size="sm" c="dimmed" mt="xs">
                            {t('image_base64.description')}
                        </Text>
                        <FileInput
                            placeholder={t('image_base64.upload_placeholder')}
                            label={t('image_base64.upload_label')}
                            value={file}
                            onChange={handleFileChange}
                            leftSection={<IconUpload size={16} />}
                            accept="image/*"
                        />
                        {file && (
                            <Paper shadow="md" p="md" radius="md" withBorder>
                                <Text fw={700} mb="xs">{t('image_base64.preview')}</Text>
                                <Image src={base64 || undefined} alt="Preview" maw={300} mx="auto" radius="md" />
                            </Paper>
                        )}
                        <Group>
                            {(file || base64) && (
                                <>
                                    <Tooltip label={clipboard.copied ? t('copied') : t('copy')} withArrow>
                                        <Button
                                            onClick={() => clipboard.copy(base64)}
                                            leftSection={<IconCopy size={16} />}
                                            disabled={!base64}
                                        >
                                            {t('copy')}
                                        </Button>
                                    </Tooltip>
                                    <Button
                                        color="red"
                                        variant="outline"
                                        leftSection={<IconTrash size={16} />}
                                        onClick={handleClear}
                                    >
                                        {t('image_base64.clear')}
                                    </Button>
                                </>
                            )}
                        </Group>
                        {base64 && (
                            <Textarea
                                label={t('image_base64.output_label')}
                                value={base64}
                                readOnly
                                autosize
                                minRows={5}
                                maxRows={10}
                            />
                        )}
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="decode" pt="md">
                    <Stack gap="md">
                        <Text ta="center" size="sm" c="dimmed" mt="xs">
                            {t('image_base64.description_2')}
                        </Text>
                        <Textarea
                            label={t('image_base64.input_base64_label')}
                            placeholder={t('image_base64.input_base64_placeholder')}
                            value={decodeInputBase64}
                            onChange={(event) => setDecodeInputBase64(event.currentTarget.value)}
                            autosize
                            minRows={5}
                            maxRows={10}
                        />
                        {decodeInputBase64 && (
                            <Paper shadow="md" p="md" radius="md" withBorder>
                                <Text fw={700} mb="xs">{t('image_base64.preview')}</Text>
                                <Image src={decodeInputBase64} alt="Decoded Preview" maw={300} mx="auto" radius="md" />
                            </Paper>
                        )}
                        <Group justify="flex-end">
                            {decodeInputBase64 && (
                                <>
                                    <Button
                                        onClick={handleDownloadDecodedImage}
                                        leftSection={<IconDownload size={16} />}
                                        disabled={!decodeInputBase64.startsWith('data:image')}
                                    >
                                        {t('image_base64.download_image')}
                                    </Button>
                                    <Tooltip label={clipboard.copied ? t('copied') : t('copy')} withArrow>
                                        <Button
                                            variant="outline"
                                            onClick={() => clipboard.copy(decodeInputBase64)}
                                            leftSection={<IconCopy size={16} />}
                                        >
                                            {t('copy')}
                                        </Button>
                                    </Tooltip>
                                </>
                            )}
                            <Button
                                color="red"
                                variant="outline"
                                leftSection={<IconTrash size={16} />}
                                onClick={handleClear}
                            >
                                {t('image_base64.clear_all')}
                            </Button>
                        </Group>
                    </Stack>
                </Tabs.Panel>
            </Tabs>
        </Container>
    );
};

export default ImageBase64ToolClient;
