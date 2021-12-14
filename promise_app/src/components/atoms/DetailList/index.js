import React from 'react';
import { View, Text } from 'react-native';

const DetailList = (props) => {
    const replacName = (name) => {
        // if (name.includes('(')) {
        //     return name.replace(/\(/g, '\n(');
        // }
        return name
    }
    return(
        <View style={{flexDirection: "row", alignItems: 'center', width:'90%', justifyContent: 'center', height:40}}>
            <Text style={{ fontSize:15, color:'black', fontWeight:'bold', width:'20%'  }}></Text>
            <View style={{flexDirection: "row",width:'93%', borderRadius: 20, alignItems: 'center'}}>
                <Text style={{borderRadius: 20, color:'#363636'}}>{replacName(props.name)}</Text>
            </View>
        </View>
    );
};
export default DetailList;