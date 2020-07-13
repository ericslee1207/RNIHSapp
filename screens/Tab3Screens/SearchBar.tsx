import React, {useState} from 'react';
import { Searchbar } from 'react-native-paper'
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

export const My_SearchBar = (props) => {
    const text_value=props.text_value;
    const onChange=props.change_function;

    return(
        <Searchbar
            style={{borderRadius: 15, width: '95%', marginTop: '4%'}}
            placeholder="Search"
            onChangeText={onChange}
            value={text_value}
        />
    )
}