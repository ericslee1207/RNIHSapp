import React from 'react';

export const ClubContext = React.createContext({
    saved_clubs: [{}],
    changeStatusClub: (val: any)=>{},
})