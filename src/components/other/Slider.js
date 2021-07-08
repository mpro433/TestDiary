import React from 'react';
import Slider from '@react-native-community/slider';

export default (props) => (
    <Slider {...props}
        step={1}
        minimumValue={0}
        maximumValue={4}
    />
);
