import {createContext} from 'react';


export const FilteredCheatsContext = createContext({
    filteredCheats: [],
    updateFilteredCheats: () => {},
});

export const SetCurrentUser = createContext({
    currentUser: [],
    updateCurrentUser: () => {},
});

export const AvatarContext = createContext({
    avatar: [],
    updateAvatar: () => {},
});
