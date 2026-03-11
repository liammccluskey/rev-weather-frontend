import React, {useState, useEffect} from 'react'
import { useBook, type BookRequest } from '../providers/BookProvider'
import styled from 'styled-components'
import { SidebarComponent } from './SidebarComponent';
import { BookListComponent } from './BookListComponent';
import { BookSubmissionComponent } from './BookSubmissionComponent';

export const Authors: string[] = [
  "F. Scott Fitzgerald",
  "George Orwell",
  "J.R.R. Tolkien",
  "Aldous Huxley",
  "Herman Melville",
  "Yuval Noah Harari",
  "J.D. Salinger"
];

export const Genres: string[] = [
  "Fiction",
  "Dystopian",
  "Fantasy",
  "Classic",
  "Science"
];

const InitialBookData: BookRequest = {
    title: '',
    author: '',
    genre: '',
    pages: 0,
    publishedYear: 2026
}

export const BookGalleryComponent = () => {
    const {books, loadingBooks, fetchBooks, postBook} = useBook()

    const [author, setAuthor] = useState<null | string>(null)
    const [genre, setGenre] = useState<null | string>(null)
    const [bookData, setBookData] = useState<BookRequest>(InitialBookData)

    // Utils

    const fetchBooksWithFilters = async () => {
        await fetchBooks(author, genre)
    }

    useEffect(() => {
        fetchBooksWithFilters()
    }, [author, genre])

    // Direct

    const onClickAuthor = (author: string): void => {
        setAuthor(curr => curr === author ? null : author)
    }

    const onClickGenre = (genre: string): void => {
        setGenre(curr => curr === genre ? null : genre)
    }

    const onChangeBookData = (event: any) => {
        const {name, value} = event.target

        setBookData(curr => ({
            ...curr,
            [name]: value
        }))
    }

    const onClickAddBook = async (event: any): Promise<void> => {
        event?.preventDefault()
        await postBook(bookData)
        await fetchBooksWithFilters()
        setBookData(InitialBookData)
    }

    return (
        <Root>
            <SidebarComponent
                author={author}
                genre={genre}
                onClickAuthor={onClickAuthor}
                onClickGenre={onClickGenre}
            />
            <div className='right-container'>
                <h3>Add a book</h3>
                <br />
                <BookSubmissionComponent
                    bookData={bookData}
                    onChangeBookData={onChangeBookData}
                    onClickAddBook={onClickAddBook}
                />
                <br />
                <h3>Books</h3>
                <br />
                {!loadingBooks && !books.length ? 
                    <div className='no-results-container float-container'>
                        <p>No books found matching those filters</p>
                    </div>
                    : <BookListComponent books={books} />
                }
            </div>
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;

    & .right-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        flex: 1;
        margin-left: 100px;
    }

    & .no-results-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        padding: 20px;
    }

`