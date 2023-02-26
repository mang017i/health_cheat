import {createContext} from 'react';


export const FilteredCheatsContext = createContext({
    filteredCheats: [],
    updateFilteredCheats: () => {},
});
