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
    setColorObj: (val: any)=>{},
    clubs: [],
    setClubs: (val: any)=>{},
    clubModal: true,
    setClubModal: (val: any)=>{},
    user: {},
    setUser: (val: any) => {}

})