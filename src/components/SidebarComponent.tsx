import React from 'react'
import styled from 'styled-components'
import { Authors, Genres } from './BookGalleryComponent' 
import { PillLabel } from './Pill'

export const SidebarComponent = (props: any) => {
    const {
        author,
        genre,

        onClickAuthor, // string => void
        onClickGenre, // string => void
    } = props

    return (
        <Root>
            <h3>Author</h3>
            {Authors.map( a => (
                <PillLabel 
                    title={a} 
                    selected={a === author}
                    onClick={() => onClickAuthor(a)} 
                    style={{marginBottom: 5}} 
                />
            ))}
            <br />
            <h3>Genre</h3>
            {Genres.map( g => (
                <PillLabel 
                    title={g} 
                    selected={g === genre}
                    onClick={() => onClickGenre(g)}  
                    style={{marginBottom: 5}}
                />
            ))}
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;


`