import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8080'
})

export interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    pages: number;
    publishedYear: number;
}

export type BookRequest = Omit<Book, "id">;

interface ContextType {
    books: Book[];
    loadingBooks: boolean;
    fetchBooks: (author: string | null, genre: string | null) => Promise<void>;
    postBook: (bookRequest: BookRequest) => Promise<void>;
}

const BookContext = React.createContext<ContextType>({
    books: [],
    loadingBooks: true,
    fetchBooks: async () => {},
    postBook: async () => {},
});

export const useBook = () => useContext(BookContext)

export const BookProvider = ({children}: any) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loadingBooks, setLoadingBooks] = useState<boolean>(true);

    useEffect(() => {

    }, [])

    // Utils

    const encodeSpecialCharacters = (value: any): string => {
    if (typeof value !== 'string') return value

    let ret = value.replace(/#/g, '%23')
    ret = ret.replace(/\+/g, '%2B')

    return ret
}

const stringifyQuery = (queryParams: Object): string => {
    return '?' + Object
        .entries(queryParams)
        .map( ([key, value]) => Array.isArray(value) ?
            value.map(item => `${key}[]=${encodeSpecialCharacters(item)}`).join('&')
            : `${key}=${encodeSpecialCharacters(value)}`
        )
        .filter(item => item.length > 0)
        .join('&')
}

    // Direct

    const fetchBooks = async (author: string | null, genre: string | null): Promise<void> => {
        const queryParams: {author?: string, genre?: string} = {}
        if (author) queryParams.author = author
        if (genre) queryParams.genre = genre
        const queryString: string = stringifyQuery(queryParams)

        setLoadingBooks(true)

        try {
            const res = await api.get(`/books${queryString}`)
            console.log(res.data)
            setBooks(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingBooks(false)
        }
    }

    const postBook = async (bookRequest: BookRequest): Promise<void> => {
        try {
            const res = await api.post(`/books`, bookRequest)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <BookContext.Provider value={{books, loadingBooks, fetchBooks, postBook}} >
            {children}
        </BookContext.Provider>
    )
}