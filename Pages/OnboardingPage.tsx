import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';
import { useState } from 'react';

export default function OnboardingPage( {setPage}: PageProps) {
const [errorMsg, setError] = useState('');
const { height,width } = useWindowDimensions(); // Needed for fine control on adataptive sizing for elements
    return (
        <View style={styles.background}>
            <Image source={require('../assets/pattern.png')}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: width, 
                    height: 107,
                    zIndex: 10,
                }}
                resizeMode="cover"
                />

            {/* Creates main text*/}
            <View style={{width: 343}}>
                <Text style={[styles.h1]}>you are all set.</Text>
                <Text style={[styles.h1, styles.shift24]}>prepare for some</Text>
                <Text style={[styles.h1, styles.shift8]}>
                    <Text style={styles.strike}>rocket</Text> science
                    <Text style={[styles.star]}>      *</Text>
                </Text>
            </View>

            <View style={{marginTop: 64}}>
                <Button text={'fly to the sky'} width={300}
                label_color={styleVariables.black} color={styleVariables.white} action={function (): void {setPage('home')}}/>
            </View>

            {errorMsg.length > 0 && <Text style={styles.error_text}>Error: {errorMsg}</Text>}
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: styleVariables.blue,
        alignItems: 'center',
        justifyContent: 'center'
    },
    h1: {
        fontSize: 36,
        fontFamily: 'Montserrat_600SemiBold',
        color: styleVariables.white
    },
    star: {
        fontSize: 30,
        fontFamily: 'Montserrat_600SemiBold',
        color: styleVariables.orange
    },
    error_text: {
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
        color: styleVariables.error,
        marginTop: 24
    },
    shift24: {
        marginLeft: 24,
    },
    shift8: {
        marginLeft: 8,
    },
    strike: {
        textDecorationLine: 'line-through',
    }
})