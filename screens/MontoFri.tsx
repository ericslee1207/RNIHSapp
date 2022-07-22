import { CurrentDate } from "./curDate";
import React from 'react'
export const MontoFri = (props: any) => {
    return <CurrentDate date={props.date.format("dddd")} />;
  };