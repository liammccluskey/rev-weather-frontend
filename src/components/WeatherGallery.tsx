import React, {useState, useEffect} from 'react'
import { useWeather, type WeatherRequest } from '../providers/WeatherProvider'
import styled from 'styled-components'
import { SidebarComponent } from './Sidebar';
import { WeatherListComponent } from './WeatherList';
import { WeatherSubmissionComponent } from './WeatherSubmission';

const InitialFormData: WeatherRequest = {
    cityName: '',
    region: '',
    latitude: '90.0',
    longitude: '180.0',
    temperature: '100.0',
    timestamp: '1773266400011',
}

export const WeatherGalleryComponent = () => {
    const {weathers, loadingWeathers, fetchWeathers, postWeather} = useWeather()

    const [cityName, setCityName] = useState<string>('')
    const [region, setRegion] = useState<string>('')
    const [formData, setFormData] = useState<WeatherRequest>(InitialFormData)

    // Utils

    const fetchWeathersWithFilters = async () => {
        await fetchWeathers(cityName, region)
    }

    useEffect(() => {
        fetchWeathersWithFilters()
    }, [])

    // Direct

    const onChangeCityName = (event: any) => {
        setCityName(event.target.value)
    }

    const onChangeRegion = (event: any) => {
        setRegion(event.target.value)
    }

    const onChangeFormData = (event: any) => {
        const {value, name} = event.target

        setFormData(curr => ({
            ...curr,
            [name]: value
        }))
    }

    const onClickAddWeather = async (event: any): Promise<void> => {
        event.preventDefault()
        try {
            await postWeather(formData)
            await fetchWeathersWithFilters()
            setFormData(InitialFormData)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmitSearch = async (event: any) => {
        event.preventDefault()
        await fetchWeathersWithFilters()
    }

    return (
        <Root>
            <SidebarComponent
                cityName={cityName}
                region={region}
                onChangeCityName={onChangeCityName}
                onChangeRegion={onChangeRegion}
                onSubmitSearch={onSubmitSearch}
            />
            <div className='right-container'>
                <h3>Add a weather record</h3>
                <br />
                <WeatherSubmissionComponent
                    formData={formData}
                    onChangeFormData={onChangeFormData}
                    onClickAddWeather={onClickAddWeather}
                />
                <br />
                <h3>Weather records</h3>
                <br />
                {!loadingWeathers && !weathers.length ? 
                    <div className='no-results-container float-container'>
                        <p>No weather records found matching those filters</p>
                    </div>
                    : <WeatherListComponent weathers={weathers} />
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