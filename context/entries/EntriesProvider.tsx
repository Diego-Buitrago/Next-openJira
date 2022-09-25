import { FC, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';

import { EntriesContext, entriesReducer } from '.';
import { entriesApi } from '../../apis';

import { Entry } from '../../interfaces';

export interface EntriesState {
    entries: Entry[];
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async( description: string ) => {

        try {
            const { data } = await entriesApi.post<Entry>('/entries', { description });
    
            dispatch({ type: '[Entry] Add-Entry', payload: data })
            
        } catch (error) {
            console.log(error);
        }       
    }

    const updateEntry = async( { _id, description, status } : Entry, showSnackbar = false ) => {

        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status });
            
            dispatch({ type: '[Entry] Entry-Updated', payload: data });

            if ( showSnackbar ) {

                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    const deleteEntry = async ( { _id } : Entry) => {

        try {
            const { data } = await entriesApi.delete(`/entries/${ _id }`);
    
            dispatch({ type: '[Entry] Entry-Deleted', payload: data })

            enqueueSnackbar('Entrada eliminada', {
                variant: 'error',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
            refreshEntries();
            
        } catch (error) {
            console.log(error);
        } 
    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Data', payload: data })
    }

    useEffect(() => {
        refreshEntries()
    }, [])
    

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry,
            deleteEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
}