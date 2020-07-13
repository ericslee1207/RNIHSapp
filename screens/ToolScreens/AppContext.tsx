import React from 'react'
export const AppContext = React.createContext({
    setTimePicker: (bool)=>{},
    setTime: (str)=>{},
    toggleModal: (bool)=>{},
    newName: (str)=>{},
    newDescription: (str)=>{}
})