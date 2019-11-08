import React from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';

const CustomButton = (props)=>{
    return(
        <View style = {{...styles.wrapper, ...props.styles}}>
            <Button color = {props.color ? props.color : '' } onPress = {props.onPress} style = {styles.Button} title = {props.title} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: 150
    }
})

export default CustomButton