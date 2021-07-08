
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import ConditionFace from './../other/ConditionFace';
import { connect } from 'react-redux';

import { conditionChanged } from './../../src/redux/actions';

const faceItems = [
    { title: "Радостное", key: 0 },
    { title: "Спокойное", key: 1 },
    { title: "Перепады настроения", key: 2 },
    { title: "Грустное", key: 3 },
    { title: "Подавленное", key: 4 },
];

const levels = [
    { title: "отсутсвует", color: '#A1A9B5' },
    { title: "легкий", color: '#FFCC48' },
    { title: "средний", color: '#FFA73F' },
    { title: "сильный", color: '#FC7E56' },
    { title: "невыносимый", color: '#FC5656' }
];

const DairyScreen = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [currCondition, setCurrCondition] = useState(props.condition || { face: null, anxiety: 0, stress: 0 });

    const unsavedChanges = !(props.condition?.face === currCondition.face &&
        props.condition?.anxiety === currCondition.anxiety &&
        props.condition?.stress === currCondition.stress);

    const getFaceIcon = (selected, index) => {
        switch (index) {
            case 0:
                return selected ? require('./../../src/assets/face0selected.png') : require('./../../src/assets/face0.png');
            case 1:
                return selected ? require('./../../src/assets/face1selected.png') : require('./../../src/assets/face1.png');
            case 2:
                return selected ? require('./../../src/assets/face2selected.png') : require('./../../src/assets/face2.png');
            case 3:
                return selected ? require('./../../src/assets/face3selected.png') : require('./../../src/assets/face3.png');
            case 4:
                return selected ? require('./../../src/assets/face4selected.png') : require('./../../src/assets/face4.png');
        }
    }

    const onFaceSelect = (index) => {
        setCurrCondition({ ...currCondition, face: index });
        if (!editMode)
            setEditMode(true);

    }

    const handleSaveButton = () => {
        if (unsavedChanges) {
            props.conditionChanged(currCondition);
            setEditMode(false);
        }
    }

    const handleSliderChange = (name) => (value) => {
        setCurrCondition({ ...currCondition, [name]: value });
    }

    const renderListItem = ({ item, index }) => {
        let icon = getFaceIcon(index === currCondition.face, index);

        return (
            <TouchableOpacity
                key={index}
                onPress={() => { onFaceSelect(index); }}
            >
                <ConditionFace title={item.title} source={icon} />
            </TouchableOpacity>
        );
    }

    const renderScene = () => {
        if (props.condition === null || editMode) {
            return (
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <FlatList style={{ marginTop: 16 }}
                        horizontal
                        data={faceItems}
                        renderItem={renderListItem}
                        showsHorizontalScrollIndicator={false}
                    />
                    {editMode &&
                        <View style={{flexDirection: 'column', justifyContent: 'space-between' }}>
                            <View>
                                <Text>Уровень тревожности</Text>
                                <Text style={{ color: levels[currCondition.anxiety].color }}>{levels[currCondition.anxiety].title}</Text>
                                <Slider style={{ width: '100%', height: 40 }}
                                    step={1}
                                    minimumValue={0}
                                    maximumValue={4}
                                    value={currCondition.anxiety}//initial value
                                    onValueChange={handleSliderChange('anxiety')}
                                />
                                <Text>Уровень стресса</Text>
                                <Text style={{ color: levels[currCondition.stress].color }}>{levels[currCondition.stress].title}</Text>
                                <Slider style={{ width: '100%', height: 40 }}
                                    step={1}
                                    minimumValue={0}
                                    maximumValue={4}
                                    value={currCondition.stress}//initial value
                                    onValueChange={handleSliderChange('stress')}
                                />
                            </View>
                            <TouchableOpacity
                                style={[unsavedChanges ? styles.buttonActive : styles.buttonInactive,
                                { alignItems: 'center', justifyContent: 'center' },
                                ]}
                                onPress={handleSaveButton}
                            >
                                <Text style={{ color: 'white' }}>Сохранить</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            );
        } else {
            return (
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <ConditionFace title={faceItems[currCondition.face].title} source={getFaceIcon(true, currCondition.face)} withMark />
                    <View style={{ width: 1, height: 60, marginHorizontal: 15, backgroundColor: '#EEEEEE' }} />
                    <View style={{ flex: 1, flexDirection: 'column' }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: levels[currCondition.anxiety].color }} />
                            <Text style={{ marginLeft: 8 }}>Тревожность</Text>
                        </View>
                        <Text style={{ marginLeft: 8 + 6, fontSize: 10 }}>{levels[currCondition.anxiety].title}</Text>


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: levels[currCondition.stress].color }} />
                            <Text style={{ marginLeft: 8 }}>Стресс</Text>
                        </View>
                        <Text style={{ marginLeft: 8 + 6, fontSize: 10 }}>{levels[currCondition.stress].title}</Text>
                    </View>
                    <TouchableOpacity style={{ alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { setEditMode(true); }}
                    >
                        <Image style={{ width: 18 }} source={require('./../../src/assets/editIcon.png')} />
                    </TouchableOpacity>
                </View >
            );
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {editMode &&
                        <TouchableOpacity style={{ marginRight: 'auto', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { setEditMode(false); }}
                        >
                            <Text style={{ fontSize: 16 }}>{"\u2190"}</Text>
                        </TouchableOpacity>
                    }
                    <Text style={editMode && { marginRight: 'auto' }}>{editMode ? "Заполнить дневник" : "Дневник"}</Text>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: '#E5E5E5' }} />
            </View>

            <Text style={{ marginTop: 20 }}>Настроение</Text>
            {renderScene()}
        </View>
    );
}

const mapStateToProps = state => ({
    condition: state.condition
});

const mapDispatchToProps = dispatch => {
    return {
        conditionChanged: (condition) => dispatch(conditionChanged(condition)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DairyScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 14
    },
    header: {
        height: 60, width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    image: {
        width: 150, height: 100,
        flexDirection: 'row', flexWrap: 'wrap',
        alignSelf: 'center'
    },
    buttonActive: {
        height: 50,
        borderRadius: 30,
        backgroundColor: '#0684F8'
    },
    buttonInactive: {
        height: 50,
        borderRadius: 30,
        backgroundColor: '#A1A9B5'
    }
});