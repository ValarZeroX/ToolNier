'use client';
import dynamic from 'next/dynamic';
import React, { memo, useEffect, useState } from 'react';

const Wheel = dynamic(() => import('react-custom-roulette').then((mod) => mod.Wheel), { ssr: false });

interface SpinWheelProps {
    data: { option: string }[];
    startSpinSignal: boolean;
    setStartSpinSignal: (value: boolean) => void;
    onResult: (result: string) => void;
    wheelColors: string[];
}

const SpinWheel: React.FC<SpinWheelProps> = memo(({ data, startSpinSignal, setStartSpinSignal, onResult, wheelColors }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    useEffect(() => {
        if (startSpinSignal && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            setPrizeNumber(randomIndex);
            setMustSpin(true);
        }
    }, [startSpinSignal, data]);

    if (!data.length) return null;

    return (
        <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            backgroundColors={Array.from({ length: data.length }, (_, i) => wheelColors[i % wheelColors.length])}
            textColors={['#333']}
            outerBorderColor={"#f2f2f2"}
            outerBorderWidth={10}
            radiusLineColor={"#dedede"}
            radiusLineWidth={2}
            innerRadius={20}
            innerBorderWidth={2}
            innerBorderColor={"#f2f2f2"}
            spinDuration={0.5}
            pointerProps={{
                style: {
                    width: '5%',
                    marginTop: '10%',
                    marginRight: '10%',
                },
            }}
            onStopSpinning={() => {
                setMustSpin(false);
                setStartSpinSignal(false);
                onResult(data[prizeNumber].option);
            }}
        />
    );
});

export default SpinWheel;
