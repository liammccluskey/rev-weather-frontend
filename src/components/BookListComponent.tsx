import React from 'react'
import styled from 'styled-components'
import type { Book } from '../providers/BookProvider'

interface Props {
    books: Book[];
}

export const BookListComponent = (props: Props) => {
    const {books} = props

    const headers = ['Id', 'Title', 'Author', 'Genre', 'Pages', 'Published Year']
    const keys: (keyof Book)[] = ['id', 'title', 'author', 'genre', 'pages', 'publishedYear']

    return (
        <Root className='float-container'>
            <tr>
                {headers.map(header => (
                    <th key={header}>{header}</th>
                ))}
            </tr>
            {books.map(book => (
                <tr key={book.id}>
                    {keys.map(key => (
                        <td>{book[key]}</td>
                    ))}
                </tr>
            ))}
        </Root>
    )
}

const Root = styled.table`
    
    border-collapse: collapse;
    text-align: left;
    border: var(--float-border) !important;
    border-collapse: collapse;
    
    th,td {
        padding: 7px;
        font-size: 14px;
    }
    th, td {
        border: 1px solid var(--border-color);
        border-collapse: collapse;
    }

    th {
        border-bottom: 1px solid var(--bc);
        color: var(--color-tertiary);
        font-weight: 500;
        font-weight: 400;
        letter-spacing: 1px;
        font-size: 12px;
    }
`