import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TodayPromise = (props) => {
    const alarmCnt = ()=>{
        let result = 0;
        if(props.data.alarmTime1){
            result += 1;
        }
        if(props.data.alarmTime2){
            result += 1;
        }
        if(props.data.alarmTime3){
            result += 1;
        }
        return result;
    }

    const alarmTime = ()=>{
        let result = [];
        if(props.data.alarmTime1){
            result = result.concat(
                <View style={{backgroundColor:props.color[0], borderRadius:5, padding:5, marginRight:10}}>
                    <Text>{props.data.alarmTime1[0]+props.data.alarmTime1[1]+':'+props.data.alarmTime1[2]+props.data.alarmTime1[3]}</Text>
                </View>
            )
        }
        if(props.data.alarmTime2){
            result = result.concat(
                <View style={{backgroundColor:props.color[0], borderRadius:5, padding:5, marginRight:10}}>
                    <Text>{props.data.alarmTime2[0]+props.data.alarmTime2[1]+':'+props.data.alarmTime2[2]+props.data.alarmTime2[3]}</Text>
                </View>
            )
        }
        if(props.data.alarmTime3){
            result = result.concat(
                <View style={{backgroundColor:props.color[0], borderRadius:5, padding:5, marginRight:10}}>
                    <Text>{props.data.alarmTime3[0]+props.data.alarmTime3[1]+':'+props.data.alarmTime3[2]+props.data.alarmTime3[3]}</Text>
                </View>
            )
        }
        return result;
    }

    const pillList = ()=>{
        let result = [];
        if (props.data.mediList){
            props.data.mediList.map(item=>{
                result = result.concat(
                    <Text style={{fontSize:15}}>{item}</Text>
                );
            });
        }
        return result;
    }
    return (
        <View style={{width:'85%', marginBottom:20}}>
            <View style={style.AlarmContainer}>
                <Icon name='bell' size={20} style={style.AlarmMargin}/>
                <Text style={style.AlarmMargin}>{alarmCnt()}회</Text>
                {alarmTime()}
            </View>
            <View style={{borderWidth:2, borderColor:props.color[1], borderRadius:10}}>
                <View style={{backgroundColor:props.color[1]}}>
                    <Text style={style.AlarmName}>{props.data.alarmTitle}</Text>
                </View>
                <View style={style.AlarmPillList}>
                    {pillList()}
                </View>
            </View>
        </View>
    );
};

export default TodayPromise;

const style = StyleSheet.create({
    AlarmContainer: {
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent: 'flex-start', 
        width:'100%', 
        margin:10
    },
    AlarmMargin:{
        marginRight:10
    },
    AlarmName:{
        fontSize:20, 
        fontWeight:'bold', 
        margin:10
    },
    AlarmPillList:{
        margin:10
    }
})