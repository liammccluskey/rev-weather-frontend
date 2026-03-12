import React, {useState, useContext} from 'react'
import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8080'
})

export interface Weather {
    id: number;
    cityName: string;
    region: string;
    latitude: string;
    longitude: string;
    temperature: string;
    timestamp: string;
}

export type WeatherRequest = Omit<Weather, "id">;

interface ContextType {
    weathers: Weather[];
    loadingWeathers: boolean;
    fetchWeathers: (cityName: string | null, region: string | null) => Promise<void>;
    postWeather: (weatherRequest: WeatherRequest) => Promise<void>;
}

const WeatherContext = React.createContext<ContextType>({
    weathers: [],
    loadingWeathers: true,
    fetchWeathers: async () => {},
    postWeather: async () => {},
});

export const useWeather = () => useContext(WeatherContext)

export const WeatherProvider = ({children}: any) => {
    const [weathers, setWeathers] = useState<Weather[]>([]);
    const [loadingWeathers, setLoadingWeathers] = useState<boolean>(true);

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

    const fetchWeathers = async (cityName: string | null, region: string | null): Promise<void> => {
        const queryParams: {cityName?: string, region?: string} = {}
        if (cityName) queryParams.cityName = cityName
        if (region) queryParams.region = region
        const queryString: string = stringifyQuery(queryParams)

        setLoadingWeathers(true)

        try {
            const res = await api.get(`/weather${queryString}`)
            console.log(res.data)
            setWeathers(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingWeathers(false)
        }
    }

    const postWeather = async (weatherRequest: WeatherRequest): Promise<void> => {
        try {
            const res = await api.post(`/weather`, weatherRequest)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <WeatherContext.Provider value={{weathers, loadingWeathers, fetchWeathers, postWeather}} >
            {children}
        </WeatherContext.Provider>
    )
}