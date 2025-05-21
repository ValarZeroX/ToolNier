// app/[lng]/tools/qr-code-generator/QRCodeGeneratorClient.tsx

'use client';
import React, { useState, useRef } from 'react';
import { Container, Title, Textarea, Group, Stack, Paper, Text, Center, Grid, useMantineColorScheme, ActionIcon, Select, Divider } from '@mantine/core';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from '../../../i18n/client';
import { IconDownload } from '@tabler/icons-react';
import ToolsActionsGrid from '@/components/ActionsGrid/ToolsActionsGrid';


interface QRCodeGeneratorClientProps {
    lng: string;
}

const QRCodeGeneratorClient: React.FC<QRCodeGeneratorClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'tools');
    const [inputValue, setInputValue] = useState<string>('https://toolnier.com');
    const qrcodeRef = useRef<HTMLDivElement>(null);
    const { colorScheme } = useMantineColorScheme();
    const [downloadFormat, setDownloadFormat] = useState<string>('png');
    //   const [showQR, setShowQR] = useState<boolean>(false);

    // const handleGenerate = () => {
    //     if (!inputValue.trim()) return;
    //     // setShowQR(true);
    // };

    const handleDownload = async () => {
        if (qrcodeRef.current) {
            const svgElement = qrcodeRef.current.querySelector('svg');
            if (svgElement) {
                const svgData = new XMLSerializer().serializeToString(svgElement);
    
                if (downloadFormat === 'svg') {
                    // ✅ 直接下載 SVG
                    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'toolnier-qr.svg';
                    link.click();
                    URL.revokeObjectURL(url);
                    return;
                }
    
                // ✅ 其它格式先轉成圖片
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
    
                const img = new Image();
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
    
                    // 背景色
                    ctx.fillStyle = colorScheme === 'dark' ? '#1A1B1E' : '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
                    ctx.drawImage(img, 0, 0);
    
                    let imageData;
                    if (downloadFormat === 'jpg') {
                        imageData = canvas.toDataURL('image/jpeg', 1.0);
                    } else {
                        // 預設 png
                        imageData = canvas.toDataURL('image/png');
                    }
    
                    const link = document.createElement('a');
                    link.href = imageData;
                    link.download = `toolnier-qr.${downloadFormat}`;
                    link.click();
                };
                img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
            }
        }
    };

    return (
        <Container size="md" mt="lg">
            <Title order={3} ta="center">{t('qr_code.title')}</Title>
            <Text ta="center" size="sm" c="dimmed" mt="xs">
                {t('qr_code.description')}
            </Text>
            <Grid>
                <Grid.Col span={{ base: 12, sm: 12, md: 8 }}>
                    <Stack gap="md" mt="md">
                        <Textarea
                            label={t('qr_code.input_label')}
                            placeholder="https://example.com"
                            value={inputValue}
                            onChange={(event) => setInputValue(event.currentTarget.value)}
                            autosize
                            minRows={3}
                        />
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 4 }}>
                    <Center>
                        <Stack>
                            <Paper shadow="md" p="md" radius="md" withBorder ref={qrcodeRef}>
                                <Text ta="center" fw={700} mb="sm">{t('qr_code.preview')}</Text>
                                <QRCodeSVG value={inputValue} size={200} />
                            </Paper>
                            <Group>
                                <Select
                                    // label={t('qr_code.format_label')}
                                    value={downloadFormat}
                                    onChange={(value) => setDownloadFormat(value || 'png')}
                                    data={[
                                        { value: 'png', label: 'PNG' },
                                        { value: 'jpg', label: 'JPG' },
                                        { value: 'svg', label: 'SVG' },
                                    ]}
                                />
                                <ActionIcon variant="default" size="lg" onClick={handleDownload}>
                                    <IconDownload />
                                </ActionIcon>
                            </Group>
                        </Stack>
                    </Center>
                </Grid.Col>
            </Grid>
            <Divider mt="md" />
            <Title order={3} mt="lg">{t('qr_code.how_to_use_title')}</Title>
            <Paper withBorder radius="md" p="md" mt="md">
                <Stack gap="xs">
                    {[0, 1, 2].map((index) => (
                        <Group key={index} wrap="nowrap" align="flex-start">
                            <Text fw={600} c="blue" size="sm" style={{ minWidth: '8px' }}>{index + 1}.</Text>
                            <Text size="sm" style={{ lineHeight: 1.6 }}>{t(`qr_code.how_to_use_steps.${index}`)}</Text>
                        </Group>
                    ))}
                </Stack>
            </Paper>
            <Title order={3} mt="lg">{t('qr_code.faq_title')}</Title>
            <Stack gap="md" mt="md">
                {[0, 1].map((index) => (
                    <Paper key={index} p="md" withBorder radius="md">
                        <Text fw={600} size="sm" mb="xs" c="blue">
                            {t(`qr_code.faq.${index}.q`)}
                        </Text>
                        <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                            {t(`qr_code.faq.${index}.a`)}
                        </Text>
                    </Paper>
                ))}
            </Stack>
            <Title order={3} mt="lg">{t('explore_more_title')}</Title>
            <ToolsActionsGrid lng={lng} />
        </Container>
    );
};

export default QRCodeGeneratorClient;
