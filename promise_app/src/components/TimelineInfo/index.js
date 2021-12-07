import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TimelineInfo = (props) => {

    return (
        <View style={style.mediInfoContainer}>
            <TouchableOpacity style={{width:'100%', height:80, justifyContent: 'center'}} onPress={()=>props.func(props.item.alarmId)}>
                <View style={{flexDirection: "row", alignItems:'center', justifyContent: 'space-between', margin:15}}>
                    <Text style={{color:'black', fontWeight:'bold', fontSize:18}}>{props.item.alarmTitle}</Text>
                    <Text style={{color:'black'}}>{props.item.alarmDayStart} ~ {props.item.alarmDayEnd}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const style = StyleSheet.create({
    mediInfoContainer: {
        width: '100%',
        marginTop: 10,
        borderWidth: 0.3,
        borderColor: '#BBBBBB',
        borderRadius: 5,
        backgroundColor: 'white',
        elevation: 1
    }
})
export default TimelineInfo;