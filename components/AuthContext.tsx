import React from 'react';

export const AuthContext = React.createContext({
    SignIn: ()=>{},
    SignOut: ()=>{},
    Schedule: [],
    setSchedule: (val: any)=>{},
    currentPeriod: {},
    setCurrentPeriod: (val: any)=>{},
    nextPeriod: {},
    setNextPeriod: (val: any)=>{},
    isHoliday: false,
    colorObj: "",
    setColorObj: (val: any)=>{}

})