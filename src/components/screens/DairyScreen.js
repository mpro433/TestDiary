
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Slider from '../other/Slider';
import ConditionFace from '../other/ConditionFace';
import { connect } from 'react-redux';

import { conditionChanged } from '../../redux/actions';
import { faces } from '../../assets';

const faceItems = [
    { title: "Радостное", id: 'face0' },
    { title: "Спокойное", id: 'face1' },
    { title: "Перепады настроения", id: 'face2' },
    { title: "Грустное", id: 'face3' },
    { title: "Подавленное", id: 'face4' },
];

const levels = [
    { title: "отсутсвует", color: '#A1A9B5', val: 0 },
    { title: "легкий", color: '#FFCC48', val: 1 },
    { title: "средний", color: '#FFA73F', val: 2 },
    { title: "сильный", color: '#FC7E56', val: 3 },
    { title: "невыносимый", color: '#FC5656', val: 4 }
];

const DairyScreen = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [currCondition, setCurrCondition] = useState(props.condition);

    const unsavedChanges = Object.keys(props.condition).some((key) => props.condition[key] !== currCondition[key]);

    const getFaceIcon = (selected, item) => {
        if(item.id === "")
            return;
            
        let name = item.id;
        if (selected)
            name += 'selected';
        return faces[name].src;
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
        const icon = getFaceIcon(item.id === currCondition.face.id, item);

        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    setCurrCondition({ ...currCondition, face: item });
                    if(!editMode)
                        setEditMode(true);
                }}
            >
                <ConditionFace title={item.title} source={icon} />
            </TouchableOpacity>
        );
    }

    const renderScene = () => {
        const renderSlider = (descr, type) => {
            const level = levels.find(x => x.val === currCondition[type]);
            return (
                <View>
                    <Text>{descr}</Text>
                    <Text style={{ color: level.color }}>{level.title}</Text>
                    <Slider style={{ width: '100%', height: 40 }}
                        value={currCondition[type]}//initial value
                        onValueChange={handleSliderChange(type)}
                    />
                </View>
            );
        }

        const editModeScene = (
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                <FlatList style={{ marginTop: 16 }}
                    horizontal
                    data={faceItems}
                    renderItem={renderListItem}
                    showsHorizontalScrollIndicator={false}
                />
                {editMode &&
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        {renderSlider("Уровень тревожности", 'anxiety')}
                        {renderSlider("Уровень стресса", 'stress')}
                        <TouchableOpacity style={unsavedChanges ? styles.buttonActive : styles.buttonInactive}
                            onPress={handleSaveButton}
                        >
                            <Text style={{ color: 'white' }}>Сохранить</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );

        const renderCompleteCondition = (descr, type) => {
            const level = levels.find(x => x.val === currCondition[type]);
            return (
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: level.color }} />
                        <Text style={{ marginLeft: 8 }}>{descr}</Text>
                    </View>
                    <Text style={{ marginLeft: 8 + 6, fontSize: 10 }}>{level.title}</Text>
                </View>
            );
        }

        const completeScene = (
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <ConditionFace title={props.condition.face.title} source={getFaceIcon(true, props.condition.face)} withMark />
                <View style={styles.separatorVert} />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {renderCompleteCondition("Тревожность", 'anxiety')}
                    {renderCompleteCondition("Стресс", 'stress')}
                </View>
                <TouchableOpacity style={styles.editButtonStyle}
                    onPress={() => { setEditMode(true); }}
                >
                    <Image style={{ width: 18 }} source={require('./../../assets/editIcon.png')} />
                </TouchableOpacity>
            </View>
        );

        return props.condition.face.id === '' || editMode ? editModeScene : completeScene;
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    {editMode &&
                        <TouchableOpacity style={{ marginRight: 'auto', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { setEditMode(false); }}
                        >
                            <Text style={{ fontSize: 16 }}>{"\u2190"}</Text>
                        </TouchableOpacity>
                    }
                    <Text style={editMode && { marginRight: 'auto' }}>{editMode ? "Заполнить дневник" : "Дневник"}</Text>
                </View>
                <View style={styles.separatorHor} />
            </View>
            <Text style={{ marginTop: 20 }}>Настроение</Text>
            {renderScene()}
        </View>
    );
}

const mapStateToProps = state => ({
    condition: state.condition
});

const actionCreators = {
    conditionChanged,    
};

export default connect(mapStateToProps, actionCreators)(DairyScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 14
    },
    headerContainer: {
        height: 60, width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 150, height: 100,
        flexDirection: 'row', flexWrap: 'wrap',
        alignSelf: 'center'
    },
    buttonActive: {
        height: 50,
        borderRadius: 30,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#0684F8'
    },
    buttonInactive: {
        height: 50,
        borderRadius: 30,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#A1A9B5'
    },
    editButtonStyle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        alignItems: 'center',
    },
    separatorVert: {
        width: 1, height: 60,
        marginHorizontal: 15,
        backgroundColor: '#EEEEEE'
    },
    separatorHor: {
        width: '100%', height: 1,
        backgroundColor: '#E5E5E5'
    }
});