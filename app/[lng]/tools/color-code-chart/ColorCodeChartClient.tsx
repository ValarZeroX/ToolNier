'use client';
import React from 'react';
import {
    Container,
    Title,
    Text,
    Table,
    Group,
    Stack,
    TextInput,
    CopyButton,
    Button,
    Tooltip,
} from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { useTranslation } from '../../../i18n/client';
import ToolsActionsGrid from '@/components/ActionsGrid/ToolsActionsGrid';
import { Notifications } from '@mantine/notifications';
import { VirtuosoGrid } from 'react-virtuoso';

interface ColorCodeChartClientProps {
    lng: string;
}

const ColorCodeChartClient: React.FC<ColorCodeChartClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'tools');
    const { t: tColor } = useTranslation(lng, 'color');

    const colorCategories = [
        {
            name: 'basic',
            colors: [
                { name: 'black', hex: '#000000', rgb: 'rgb(0, 0, 0)' },
                { name: 'darkGray', hex: '#404040', rgb: 'rgb(64, 64, 64)' },
                { name: 'dimGray', hex: '#696969', rgb: 'rgb(105, 105, 105)' },
                { name: 'gray', hex: '#808080', rgb: 'rgb(128, 128, 128)' },
                { name: 'darkGrayX11', hex: '#A9A9A9', rgb: 'rgb(169, 169, 169)' },
                { name: 'silver', hex: '#C0C0C0', rgb: 'rgb(192, 192, 192)' },
                { name: 'lightGray', hex: '#D3D3D3', rgb: 'rgb(211, 211, 211)' },
                { name: 'gainsboro', hex: '#DCDCDC', rgb: 'rgb(220, 220, 220)' },
                { name: 'whiteSmoke', hex: '#F5F5F5', rgb: 'rgb(245, 245, 245)' },
                { name: 'white', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)' },
                { name: 'snow', hex: '#FFFAFA', rgb: 'rgb(255, 250, 250)' },
                { name: 'ironGray', hex: '#625D5D', rgb: 'rgb(98, 93, 93)' },
                { name: 'sandBeige', hex: '#967969', rgb: 'rgb(150, 121, 105)' },
                { name: 'rosyBrown', hex: '#BC8F8F', rgb: 'rgb(188, 143, 143)' },
                { name: 'lightCoral', hex: '#F08080', rgb: 'rgb(240, 128, 128)' },
                { name: 'indianRed', hex: '#CD5C5C', rgb: 'rgb(205, 92, 92)' },
                { name: 'brown', hex: '#A52A2A', rgb: 'rgb(165, 42, 42)' },
                { name: 'fireBrick', hex: '#B22222', rgb: 'rgb(178, 34, 34)' },
                { name: 'maroon', hex: '#800000', rgb: 'rgb(128, 0, 0)' },
                { name: 'darkRed', hex: '#8B0000', rgb: 'rgb(139, 0, 0)' },
                { name: 'strongRed', hex: '#E60000', rgb: 'rgb(230, 0, 0)' },
                { name: 'red', hex: '#FF0000', rgb: 'rgb(255, 0, 0)' },
                { name: 'persimmon', hex: '#FF6347', rgb: 'rgb(255, 99, 71)' },
                { name: 'mistyRose', hex: '#FFE4E1', rgb: 'rgb(255, 228, 225)' },
                { name: 'salmon', hex: '#FA8072', rgb: 'rgb(250, 128, 114)' },
                { name: 'scarlet', hex: '#FF2400', rgb: 'rgb(255, 36, 0)' },
                { name: 'tomato', hex: '#FF6347', rgb: 'rgb(255, 99, 71)' },
                { name: 'darkSalmon', hex: '#E9967A', rgb: 'rgb(233, 150, 122)' },
                { name: 'coral', hex: '#FF7F50', rgb: 'rgb(255, 127, 80)' },
                { name: 'orange', hex: '#FFA500', rgb: 'rgb(255, 165, 0)' },
                { name: 'orangeRed', hex: '#FF4500', rgb: 'rgb(255, 69, 0)' },
                { name: 'lightSalmon', hex: '#FFA07A', rgb: 'rgb(255, 160, 122)' },
                { name: 'vermilion', hex: '#FF4D00', rgb: 'rgb(255, 77, 0)' },
                { name: 'sienna', hex: '#A0522D', rgb: 'rgb(160, 82, 45)' },
                { name: 'tropicalOrange', hex: '#FF7F00', rgb: 'rgb(255, 127, 0)' },
                { name: 'camel', hex: '#C19A6B', rgb: 'rgb(193, 154, 107)' },
                { name: 'apricot', hex: '#FFB699', rgb: 'rgb(255, 182, 153)' },
                { name: 'coconutBrown', hex: '#965A3E', rgb: 'rgb(150, 90, 62)' },
                { name: 'seashell', hex: '#FFF5EE', rgb: 'rgb(255, 245, 238)' },
                { name: 'saddleBrown', hex: '#8B4513', rgb: 'rgb(139, 69, 19)' },
                { name: 'chocolate', hex: '#D2691E', rgb: 'rgb(210, 105, 30)' },
                { name: 'sunOrange', hex: '#FF7F00', rgb: 'rgb(255, 127, 0)' },
                { name: 'sandBrown', hex: '#F4A460', rgb: 'rgb(244, 164, 96)' },
                { name: 'bronze', hex: '#CD7F32', rgb: 'rgb(205, 127, 50)' },
                { name: 'linen', hex: '#FAF0E6', rgb: 'rgb(250, 240, 230)' },
                { name: 'honeyOrange', hex: '#FFB000', rgb: 'rgb(255, 176, 0)' },
                { name: 'sepia', hex: '#704214', rgb: 'rgb(112, 66, 20)' },
                { name: 'burntOrange', hex: '#CC5500', rgb: 'rgb(204, 85, 0)' },
                { name: 'ocher', hex: '#CC7722', rgb: 'rgb(204, 119, 34)' },
                { name: 'peru', hex: '#CD853F', rgb: 'rgb(205, 133, 63)' },
                { name: 'tangerine', hex: '#F28500', rgb: 'rgb(242, 133, 0)' },
                { name: 'darkOrange', hex: '#FF8C00', rgb: 'rgb(255, 140, 0)' },
                { name: 'antiqueWhite', hex: '#FAEBD7', rgb: 'rgb(250, 235, 215)' },
                { name: 'tan', hex: '#D2B48C', rgb: 'rgb(210, 180, 140)' },
                { name: 'burlyWood', hex: '#DEB887', rgb: 'rgb(222, 184, 135)' },
                { name: 'peachPuff', hex: '#FFDAB9', rgb: 'rgb(255, 218, 185)' },
                { name: 'navajoWhite', hex: '#FFDEAD', rgb: 'rgb(255, 222, 173)' },
                { name: 'moccasin', hex: '#FFE4B5', rgb: 'rgb(255, 228, 181)' },
                { name: 'bisque', hex: '#FFE4C4', rgb: 'rgb(255, 228, 196)' },
                { name: 'blanchedAlmond', hex: '#FFEBCD', rgb: 'rgb(255, 235, 205)' },
                { name: 'papayaWhip', hex: '#FFEFD5', rgb: 'rgb(255, 239, 213)' },
                { name: 'cornsilk', hex: '#FFF8DC', rgb: 'rgb(255, 248, 220)' },
                { name: 'marigold', hex: '#FFD700', rgb: 'rgb(255, 215, 0)' },
                { name: 'paleOcre', hex: '#CC7722', rgb: 'rgb(204, 119, 34)' },
                { name: 'khaki', hex: '#F0E68C', rgb: 'rgb(240, 230, 140)' },
                { name: 'oldLace', hex: '#FDF5E6', rgb: 'rgb(253, 245, 230)' },
                { name: 'wheat', hex: '#F5DEB3', rgb: 'rgb(245, 222, 179)' },
                { name: 'peach', hex: '#FFE5B4', rgb: 'rgb(255, 229, 180)' },
                { name: 'floralWhite', hex: '#FFFAF0', rgb: 'rgb(255, 250, 240)' },
                { name: 'goldenrod', hex: '#DAA520', rgb: 'rgb(218, 165, 32)' },
                { name: 'darkGoldenrod', hex: '#B8860B', rgb: 'rgb(184, 134, 11)' },
                { name: 'coffee', hex: '#6F4E37', rgb: 'rgb(111, 78, 55)' },
                { name: 'jasmine', hex: '#F8DE7E', rgb: 'rgb(248, 222, 126)' },
                { name: 'amber', hex: '#FFBF00', rgb: 'rgb(255, 191, 0)' },
                { name: 'chromeYellow', hex: '#FFA700', rgb: 'rgb(255, 167, 0)' },
                { name: 'golden', hex: '#FFD700', rgb: 'rgb(255, 215, 0)' },
                { name: 'lightKhaki', hex: '#F0E68C', rgb: 'rgb(240, 230, 140)' },
                { name: 'darkKhaki', hex: '#BDB76B', rgb: 'rgb(189, 183, 107)' },
                { name: 'mimosa', hex: '#F8DD5C', rgb: 'rgb(248, 221, 92)' },
                { name: 'paleGoldenrod', hex: '#EEE8AA', rgb: 'rgb(238, 232, 170)' },
                { name: 'beige', hex: '#F5F5DC', rgb: 'rgb(245, 245, 220)' },
                { name: 'lightGoldenrodYellow', hex: '#FAFAD2', rgb: 'rgb(250, 250, 210)' },
                { name: 'lemonChiffon', hex: '#FFFACD', rgb: 'rgb(255, 250, 205)' },
                { name: 'cream', hex: '#FFFDD0', rgb: 'rgb(255, 253, 208)' },
                { name: 'lightYellow', hex: '#FFFFE0', rgb: 'rgb(255, 255, 224)' },
                { name: 'ivory', hex: '#FFFFF0', rgb: 'rgb(255, 255, 240)' },
                { name: 'champagneYellow', hex: '#F7E7CE', rgb: 'rgb(247, 231, 206)' },
                { name: 'mustard', hex: '#FFDB58', rgb: 'rgb(255, 219, 88)' },
                { name: 'moonYellow', hex: '#F0C420', rgb: 'rgb(240, 196, 32)' },
                { name: 'olive', hex: '#808000', rgb: 'rgb(128, 128, 0)' },
                { name: 'canaryYellow', hex: '#FFEF00', rgb: 'rgb(255, 239, 0)' },
                { name: 'yellow', hex: '#FFFF00', rgb: 'rgb(255, 255, 0)' },
                { name: 'mossGreen', hex: '#8A9A5B', rgb: 'rgb(138, 154, 91)' },
                { name: 'fluorescentYellow', hex: '#CCFF00', rgb: 'rgb(204, 255, 0)' },
                { name: 'oliveDrab', hex: '#6B8E23', rgb: 'rgb(107, 142, 35)' },
                { name: 'yellowGreen', hex: '#9ACD32', rgb: 'rgb(154, 205, 50)' },
                { name: 'darkOliveGreen', hex: '#556B2F', rgb: 'rgb(85, 107, 47)' },
                { name: 'appleGreen', hex: '#8DB600', rgb: 'rgb(141, 182, 0)' },
                { name: 'greenYellow', hex: '#ADFF2F', rgb: 'rgb(173, 255, 47)' },
                { name: 'grassGreen', hex: '#7CFC00', rgb: 'rgb(124, 252, 0)' },
                { name: 'lawnGreen', hex: '#7CFC00', rgb: 'rgb(124, 252, 0)' },
                { name: 'chartreuse', hex: '#7FFF00', rgb: 'rgb(127, 255, 0)' },
                { name: 'foliageGreen', hex: '#4F7942', rgb: 'rgb(79, 121, 66)' },
                { name: 'freshLeaves', hex: '#90EE90', rgb: 'rgb(144, 238, 144)' },
                { name: 'brightGreen', hex: '#66FF00', rgb: 'rgb(102, 255, 0)' },
                { name: 'cobaltGreen', hex: '#3D9970', rgb: 'rgb(61, 153, 112)' },
                { name: 'honeydew', hex: '#F0FFF0', rgb: 'rgb(240, 255, 240)' },
                { name: 'darkSeaGreen', hex: '#8FBC8F', rgb: 'rgb(143, 188, 143)' },
                { name: 'lightGreen', hex: '#90EE90', rgb: 'rgb(144, 238, 144)' },
                { name: 'paleGreen', hex: '#98FB98', rgb: 'rgb(152, 251, 152)' },
                { name: 'ivyGreen', hex: '#36B37E', rgb: 'rgb(54, 179, 126)' },
                { name: 'forestGreen', hex: '#228B22', rgb: 'rgb(34, 139, 34)' },
                { name: 'limeGreen', hex: '#32CD32', rgb: 'rgb(50, 205, 50)' },
                { name: 'darkGreen', hex: '#006400', rgb: 'rgb(0, 100, 0)' },
                { name: 'green', hex: '#008000', rgb: 'rgb(0, 128, 0)' },
                { name: 'lime', hex: '#00FF00', rgb: 'rgb(0, 255, 0)' },
                { name: 'malachite', hex: '#0BDA51', rgb: 'rgb(11, 218, 81)' },
                { name: 'mint', hex: '#3EB489', rgb: 'rgb(62, 180, 137)' },
                { name: 'celadon', hex: '#ACE1AF', rgb: 'rgb(172, 225, 175)' },
                { name: 'veryLightMalachiteGreen', hex: '#50C878', rgb: 'rgb(80, 200, 120)' },
                { name: 'viridian', hex: '#40826D', rgb: 'rgb(64, 130, 109)' },
                { name: 'horizonBlue', hex: '#E0FFFF', rgb: 'rgb(224, 255, 255)' },
                { name: 'seaGreen', hex: '#2E8B57', rgb: 'rgb(46, 139, 87)' },
                { name: 'mediumSeaGreen', hex: '#3CB371', rgb: 'rgb(60, 179, 113)' },
                { name: 'turquoiseGreen', hex: '#A0D6B4', rgb: 'rgb(160, 214, 180)' },
                { name: 'emerald', hex: '#50C878', rgb: 'rgb(80, 200, 120)' },
                { name: 'mintCream', hex: '#F5FFFA', rgb: 'rgb(245, 255, 250)' },
                { name: 'springGreen', hex: '#00FF7F', rgb: 'rgb(0, 255, 127)' },
                { name: 'peacockGreen', hex: '#33A1C9', rgb: 'rgb(51, 161, 201)' },
                { name: 'mediumSpringGreen', hex: '#00FA9A', rgb: 'rgb(0, 250, 154)' },
                { name: 'mediumAquamarine', hex: '#66CDAA', rgb: 'rgb(102, 205, 170)' },
                { name: 'aquamarine', hex: '#7FFFD4', rgb: 'rgb(127, 255, 212)' },
                { name: 'cyanBlue', hex: '#00FFFF', rgb: 'rgb(0, 255, 255)' },
                { name: 'aquaBlue', hex: '#00FFFF', rgb: 'rgb(0, 255, 255)' },
                { name: 'lightAquaBlue', hex: '#E0FFFF', rgb: 'rgb(224, 255, 255)' },
                { name: 'turquoiseBlue', hex: '#00FFEF', rgb: 'rgb(0, 255, 239)' },
                { name: 'turquoise', hex: '#40E0D0', rgb: 'rgb(64, 224, 208)' },
                { name: 'lightSeaGreen', hex: '#20B2AA', rgb: 'rgb(32, 178, 170)' },
                { name: 'mediumTurquoise', hex: '#48D1CC', rgb: 'rgb(72, 209, 204)' },
                { name: 'babyBlue', hex: '#89CFF0', rgb: 'rgb(137, 207, 240)' },
                { name: 'paleTurquoise', hex: '#AFEEEE', rgb: 'rgb(175, 238, 238)' },
                { name: 'darkSlateGray', hex: '#2F4F4F', rgb: 'rgb(47, 79, 79)' },
                { name: 'teal', hex: '#008080', rgb: 'rgb(0, 128, 128)' },
                { name: 'darkCyan', hex: '#008B8B', rgb: 'rgb(0, 139, 139)' },
                { name: 'lightCyan', hex: '#E0FFFF', rgb: 'rgb(224, 255, 255)' },
                { name: 'cyan', hex: '#00FFFF', rgb: 'rgb(0, 255, 255)' },
                { name: 'darkTurquoise', hex: '#00CED1', rgb: 'rgb(0, 206, 209)' },
                { name: 'cadetBlue', hex: '#5F9EA0', rgb: 'rgb(95, 158, 160)' },
                { name: 'peacockBlue', hex: '#33A1C9', rgb: 'rgb(51, 161, 201)' },
                { name: 'strongBlue', hex: '#0066CC', rgb: 'rgb(0, 102, 204)' },
                { name: 'lightBlue', hex: '#ADD8E6', rgb: 'rgb(173, 216, 230)' },
                { name: 'powderBlue', hex: '#B0E0E6', rgb: 'rgb(176, 224, 230)' },
                { name: 'paleBlue', hex: '#E0FFFF', rgb: 'rgb(224, 255, 255)' },
                { name: 'aliceBlue', hex: '#F0F8FF', rgb: 'rgb(240, 248, 255)' },
                { name: 'saxeBlue', hex: '#4682B4', rgb: 'rgb(70, 130, 180)' },
                { name: 'deepSkyBlue', hex: '#00BFFF', rgb: 'rgb(0, 191, 255)' },
                { name: 'marineBlue', hex: '#013366', rgb: 'rgb(1, 51, 102)' },
                { name: 'prussianBlue', hex: '#003153', rgb: 'rgb(0, 49, 83)' },
                { name: 'dodgerBlue', hex: '#1E90FF', rgb: 'rgb(30, 144, 255)' },
                { name: 'mineralBlue', hex: '#3D5A80', rgb: 'rgb(61, 90, 128)' },
                { name: 'cerulean', hex: '#007BA7', rgb: 'rgb(0, 123, 167)' },
                { name: 'azure', hex: '#007FFF', rgb: 'rgb(0, 127, 255)' },
                { name: 'wedgwoodBlue', hex: '#4B7DB6', rgb: 'rgb(75, 125, 182)' },
                { name: 'lightSteelBlue', hex: '#B0C4DE', rgb: 'rgb(176, 196, 222)' },
                { name: 'paleDenim', hex: '#B0C4DE', rgb: 'rgb(176, 196, 222)' },
                { name: 'salviaBlue', hex: '#B0C4DE', rgb: 'rgb(176, 196, 222)' },
                { name: 'darkPowderBlue', hex: '#003399', rgb: 'rgb(0, 51, 153)' },
                { name: 'cobaltBlue', hex: '#0047AB', rgb: 'rgb(0, 71, 171)' },
                { name: 'sapphire', hex: '#0F52BA', rgb: 'rgb(15, 82, 186)' },
                { name: 'internationalKleinBlue', hex: '#002FA7', rgb: 'rgb(0, 47, 167)' },
                { name: 'ceruleanBlue', hex: '#2A52BE', rgb: 'rgb(42, 82, 190)' },
                { name: 'royalBlue', hex: '#4169E1', rgb: 'rgb(65, 105, 225)' },
                { name: 'darkMineralBlue', hex: '#1E3F66', rgb: 'rgb(30, 63, 102)' },
                { name: 'ultramarine', hex: '#3F00FF', rgb: 'rgb(63, 0, 255)' },
                { name: 'ghostWhite', hex: '#F8F8FF', rgb: 'rgb(248, 248, 255)' },
                { name: 'lavenderMist', hex: '#E6E6FA', rgb: 'rgb(230, 230, 250)' },
                { name: 'lavenderBlue', hex: '#CCCCFF', rgb: 'rgb(204, 204, 255)' },
                { name: 'periwinkle', hex: '#CCCCFF', rgb: 'rgb(204, 204, 255)' },
                { name: 'navyBlue', hex: '#000080', rgb: 'rgb(0, 0, 128)' },
                { name: 'darkBlue', hex: '#00008B', rgb: 'rgb(0, 0, 139)' },
                { name: 'mediumBlue', hex: '#0000CD', rgb: 'rgb(0, 0, 205)' },
                { name: 'blue', hex: '#0000FF', rgb: 'rgb(0, 0, 255)' },
                { name: 'midnightBlue', hex: '#191970', rgb: 'rgb(25, 25, 112)' },
                { name: 'lapisLazuli', hex: '#26619C', rgb: 'rgb(38, 97, 156)' },
                { name: 'grayishPurple', hex: '#8B7B8B', rgb: 'rgb(139, 123, 139)' },
                { name: 'steelBlue', hex: '#4682B4', rgb: 'rgb(70, 130, 180)' },
                { name: 'darkSlateBlue', hex: '#483D8B', rgb: 'rgb(72, 61, 139)' },
                { name: 'indigo', hex: '#4B0082', rgb: 'rgb(75, 0, 130)' },
                { name: 'purple', hex: '#800080', rgb: 'rgb(128, 0, 128)' },
                { name: 'slateBlue', hex: '#6A5ACD', rgb: 'rgb(106, 90, 205)' },
                { name: 'cornflowerBlue', hex: '#6495ED', rgb: 'rgb(100, 149, 237)' },
                { name: 'mediumSlateBlue', hex: '#7B68EE', rgb: 'rgb(123, 104, 238)' },
                { name: 'slateGray', hex: '#708090', rgb: 'rgb(112, 128, 144)' },
                { name: 'lightSlateGray', hex: '#778899', rgb: 'rgb(119, 136, 153)' },
                { name: 'violet', hex: '#8A2BE2', rgb: 'rgb(138, 43, 226)' },
                { name: 'blueViolet', hex: '#8A2BE2', rgb: 'rgb(138, 43, 226)' },
                { name: 'darkMagenta', hex: '#8B008B', rgb: 'rgb(139, 0, 139)' },
                { name: 'plum', hex: '#DDA0DD', rgb: 'rgb(221, 160, 221)' },
                { name: 'skyBlue', hex: '#87CEEB', rgb: 'rgb(135, 206, 235)' },
                { name: 'lightSkyBlue', hex: '#87CEFA', rgb: 'rgb(135, 206, 250)' },
                { name: 'burgundy', hex: '#800020', rgb: 'rgb(128, 0, 32)' },
                { name: 'patriarch', hex: '#800080', rgb: 'rgb(128, 0, 128)' },
                { name: 'mediumPurple', hex: '#9370DB', rgb: 'rgb(147, 112, 219)' },
                { name: 'darkViolet', hex: '#9400D3', rgb: 'rgb(148, 0, 211)' },
                { name: 'darkOrchid', hex: '#9932CC', rgb: 'rgb(153, 50, 204)' },
                { name: 'amethyst', hex: '#9966CC', rgb: 'rgb(153, 102, 204)' },
                { name: 'mediumOrchid', hex: '#BA55D3', rgb: 'rgb(186, 85, 211)' },
                { name: 'lavender', hex: '#E6E6FA', rgb: 'rgb(230, 230, 250)' },
                { name: 'pansy', hex: '#78184A', rgb: 'rgb(120, 24, 74)' },
                { name: 'mallow', hex: '#E8ADAA', rgb: 'rgb(232, 173, 170)' },
                { name: 'operaMauve', hex: '#B784A7', rgb: 'rgb(183, 132, 167)' },
                { name: 'paleLilac', hex: '#DCD0FF', rgb: 'rgb(220, 208, 255)' },
                { name: 'mineralViolet', hex: '#8B7B8B', rgb: 'rgb(139, 123, 139)' },
                { name: 'lightViolet', hex: '#E6E6FA', rgb: 'rgb(230, 230, 250)' },
                { name: 'lilac', hex: '#C8A2C8', rgb: 'rgb(200, 162, 200)' },
                { name: 'wisteria', hex: '#C9A0DC', rgb: 'rgb(201, 160, 220)' },
                { name: 'mediumLavenderMagenta', hex: '#EE82EE', rgb: 'rgb(238, 130, 238)' },
                { name: 'lavenderMagenta', hex: '#EE82EE', rgb: 'rgb(238, 130, 238)' },
                { name: 'heliotrope', hex: '#DF73FF', rgb: 'rgb(223, 115, 255)' },
                { name: 'mauve', hex: '#E0B0FF', rgb: 'rgb(224, 176, 255)' },
                { name: 'thistle', hex: '#D8BFD8', rgb: 'rgb(216, 191, 216)' },
                { name: 'clematis', hex: '#8B7B8B', rgb: 'rgb(139, 123, 139)' },
                { name: 'magenta', hex: '#FF00FF', rgb: 'rgb(255, 0, 255)' },
                { name: 'fuchsia', hex: '#FF00FF', rgb: 'rgb(255, 0, 255)' },
                { name: 'orchid', hex: '#DA70D6', rgb: 'rgb(218, 112, 214)' },
                { name: 'pearlPink', hex: '#FFDAB9', rgb: 'rgb(255, 218, 185)' },
                { name: 'oldRose', hex: '#C08081', rgb: 'rgb(192, 128, 129)' },
                { name: 'rosePink', hex: '#FF66CC', rgb: 'rgb(255, 102, 204)' },
                { name: 'mediumVioletRed', hex: '#C71585', rgb: 'rgb(199, 21, 133)' },
                { name: 'magentaRose', hex: '#FF00FF', rgb: 'rgb(255, 0, 255)' },
                { name: 'rose', hex: '#FF007F', rgb: 'rgb(255, 0, 127)' },
                { name: 'ruby', hex: '#E0115F', rgb: 'rgb(224, 17, 95)' },
                { name: 'camellia', hex: '#FF6EC7', rgb: 'rgb(255, 110, 199)' },
                { name: 'deepPink', hex: '#FF1493', rgb: 'rgb(255, 20, 147)' },
                { name: 'flamingo', hex: '#FC8EAC', rgb: 'rgb(252, 142, 172)' },
                { name: 'coralPink', hex: '#F88379', rgb: 'rgb(248, 131, 121)' },
                { name: 'hotPink', hex: '#FF69B4', rgb: 'rgb(255, 105, 180)' },
                { name: 'spinelRed', hex: '#FF1CAE', rgb: 'rgb(255, 28, 174)' },
                { name: 'carmine', hex: '#960018', rgb: 'rgb(150, 0, 24)' },
                { name: 'babyPink', hex: '#FFC0CB', rgb: 'rgb(255, 192, 203)' },
                { name: 'cardinalRed', hex: '#C41E3A', rgb: 'rgb(196, 30, 58)' },
                { name: 'lavenderBlush', hex: '#FFF0F5', rgb: 'rgb(255, 240, 245)' },
                { name: 'paleVioletRed', hex: '#DB7093', rgb: 'rgb(219, 112, 147)' },
                { name: 'cerise', hex: '#DE3163', rgb: 'rgb(222, 49, 99)' },
                { name: 'salmonPink', hex: '#FF91A4', rgb: 'rgb(255, 145, 164)' },
                { name: 'crimson', hex: '#DC143C', rgb: 'rgb(220, 20, 60)' },
                { name: 'pink', hex: '#FFC0CB', rgb: 'rgb(255, 192, 203)' },
                { name: 'lightPink', hex: '#FFB6C1', rgb: 'rgb(255, 182, 193)' },
                { name: 'shellPink', hex: '#FFB3BF', rgb: 'rgb(255, 179, 191)' },
                { name: 'alizarinCrimson', hex: '#E32636', rgb: 'rgb(227, 38, 54)' }
            ]
        }
    ];

    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        Notifications.show({
            title: t('copied'),
            message: value,
            color: 'green',
            autoClose: 2000,
        });
    };

    return (
        <Container size="lg" mt="lg">
            <Title order={3} ta="center">{t('color_code_chart.title')}</Title>
            <Text ta="center" size="sm" c="dimmed" mt="xs">
                {t('color_code_chart.description')}
            </Text>

            <Stack mt="xl" gap="xl">
                {colorCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                        <Title order={4} mb="md">{t(`color_code_chart.categories.${category.name}`)}</Title>
                        
                        {/* Table Header */}
                        <Table striped highlightOnHover withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th style={{ width: '30%' }}>{t('color_code_chart.color_name')}</Table.Th>
                                    <Table.Th style={{ width: '35%' }}>{t('color_code_chart.hex')}</Table.Th>
                                    <Table.Th style={{ width: '35%' }}>{t('color_code_chart.rgb')}</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                        </Table>

                        {/* Virtualized Table Body */}
                        <VirtuosoGrid
                            style={{ height: `${Math.ceil(category.colors.length ) * 64}px` }}
                            totalCount={category.colors.length}
                            listClassName="color-table"
                            itemContent={(index) => {
                                const color = category.colors[index];
                                return (
                                    <div className="color-table-row">
                                        <div className="color-table-cell name-cell">
                                            <Group gap="xs">
                                                <div
                                                    style={{
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: 4,
                                                        backgroundColor: color.hex,
                                                        border: '1px solid rgba(0,0,0,0.1)',
                                                    }}
                                                />
                                                <Text fw={500}>{tColor(`${category.name}.${color.name}`)}</Text>
                                            </Group>
                                        </div>
                                        <div className="color-table-cell hex-cell">
                                            <Group gap="xs">
                                                <TextInput
                                                    value={color.hex}
                                                    readOnly
                                                    size="xs"
                                                    style={{ flex: 1 }}
                                                    styles={{
                                                        input: {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                                            border: '1px solid rgba(0, 0, 0, 0.1)',
                                                        },
                                                    }}
                                                />
                                                <Button
                                                    variant="light"
                                                    size="xs"
                                                    color="gray"
                                                    onClick={() => {
                                                        handleCopy(color.hex);
                                                    }}
                                                >
                                                    <IconCopy size={14} />
                                                </Button>
                                            </Group>
                                        </div>
                                        <div className="color-table-cell rgb-cell">
                                            <Group gap="xs">
                                                <TextInput
                                                    value={color.rgb}
                                                    readOnly
                                                    size="xs"
                                                    style={{ flex: 1 }}
                                                    styles={{
                                                        input: {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                                            border: '1px solid rgba(0, 0, 0, 0.1)',
                                                        },
                                                    }}
                                                />
                                                <Button
                                                    variant="light"
                                                    color="gray"
                                                    size="xs"
                                                    onClick={() => {
                                                        handleCopy(color.rgb);
                                                    }}
                                                >
                                                    <IconCopy size={14} />
                                                </Button>
                                            </Group>
                                        </div>
                                    </div>
                                );
                            }}
                        />
                    </div>
                ))}
            </Stack>

            <Title order={3} mt="xl">{t('explore_more_title')}</Title>
            <ToolsActionsGrid lng={lng} />

            <style jsx global>{`
                .color-table {
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                    border: 1px solid var(--mantine-color-gray-3);
                    border-top: none;
                }
                .color-table-row {
                    display: grid;
                    grid-template-columns: 30% 35% 35%;
                    padding: 0.5rem;
                    border-bottom: 1px solid var(--mantine-color-gray-3);
                    background-color: var(--mantine-color-white);
                }
                .color-table-row:nth-child(even) {
                    background-color: var(--mantine-color-gray-0);
                }
                .color-table-row:hover {
                    background-color: var(--mantine-color-gray-1);
                }
                .color-table-cell {
                    padding: 0.5rem;
                    display: flex;
                    align-items: center;
                }
                .name-cell {
                    font-weight: 500;
                }
            `}</style>
        </Container>
    );
};

export default ColorCodeChartClient;
