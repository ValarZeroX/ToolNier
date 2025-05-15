// app/[lng]/tools/qr-code-generator/QRCodeGeneratorClient.tsx

'use client';
import React, { useState, useRef } from 'react';
import { Container, Title, Textarea, Group, Stack, Paper, Text, Center, Grid, useMantineColorScheme, ActionIcon, Select } from '@mantine/core';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from '../../../i18n/client';
import { IconDownload } from '@tabler/icons-react';


interface QRCodeGeneratorClientProps {
    lng: string;
}

const QRCodeGeneratorClient: React.FC<QRCodeGeneratorClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'common');
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
            <Title order={3} ta="center">{t('qr_generator.title')}</Title>
            <Text ta="center" size="sm" c="dimmed" mt="xs">
                {t('qr_generator.description')}
            </Text>
            <Grid>
                <Grid.Col span={{ base: 12, sm: 12, md: 8 }}>
                    <Stack gap="md" mt="md">
                        <Textarea
                            label={t('qr_generator.input_label')}
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
                                <Text ta="center" fw={700} mb="sm">{t('qr_generator.preview')}</Text>
                                <QRCodeSVG value={inputValue} size={200} />
                            </Paper>
                            <Group>
                                <Select
                                    // label={t('qr_generator.format_label')}
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
        </Container>
    );
};

export default QRCodeGeneratorClient;
