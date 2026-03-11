import React from 'react'
import styled from 'styled-components'
import type { BookRequest } from '../providers/BookProvider'

interface Props {
    bookData: BookRequest;
    onClickAddBook: (event: any) => Promise<void>;
    onChangeBookData: (event: any) => void;
}

export const BookSubmissionComponent = (props: Props) => {
    const {bookData, onClickAddBook, onChangeBookData} = props

    return (
        <Root onSubmit={onClickAddBook} className='float-container'>
            <div className='left-container'>
                <label>Title</label>
                <input type='text' name='title' value={bookData.title} onChange={onChangeBookData} required />
                <br/>
                <label>Author</label>
                <input type='text' name='author' value={bookData.author} onChange={onChangeBookData} required />
                <br/>
                <label>Genre</label>
                <input type='text' name='genre' value={bookData.genre} onChange={onChangeBookData} required />
                </div>
            <div className='right-container'>
                <label>Pages</label>
                <input type='number' name='pages' value={bookData.pages} onChange={onChangeBookData} required />
                <br/>
                <label>Published Year</label>
                <input type='number' name='publishedYear' value={bookData.publishedYear} onChange={onChangeBookData} required />
                <br/>
            </div>
            <br/>
            <input type='submit' style={{alignSelf: 'flex-end'}} />
        </Root>
    )
}

const Root = styled.form`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;

    .left-container, .right-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 10px;
        flex: 1;
    }
`