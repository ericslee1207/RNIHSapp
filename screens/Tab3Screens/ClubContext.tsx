import React from 'react';

export const ClubContext = React.createContext({
    saved_clubs: [{}],
    save_club: (value)=>{}
})