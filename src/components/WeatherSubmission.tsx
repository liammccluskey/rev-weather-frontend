import React from 'react'
import styled from 'styled-components'
import type { WeatherRequest } from '../providers/WeatherProvider'

interface Props {
    formData: WeatherRequest;
    errorMessage: string;
    onClickAddWeather: (event: any) => Promise<void>;
    onChangeFormData: (event: any) => void;
}

export const WeatherSubmissionComponent = (props: Props) => {
    const {formData, errorMessage, onClickAddWeather, onChangeFormData} = props

    return (
        <Root onSubmit={onClickAddWeather} className='float-container'>
            <div className='top-container'>
                <div className='left-container'>
                    <label>City name</label>
                    <input type='text' name='cityName' value={formData.cityName} onChange={onChangeFormData} required />
                    <br/>
                    <label>Region</label>
                    <input type='text' name='region' value={formData.region} onChange={onChangeFormData} required />
                    <br/>
                    <label>Latitude</label>
                    <input type='text' name='latitude' value={formData.latitude} onChange={onChangeFormData} required />
                    </div>
                <div className='right-container'>
                    <label>Longitude</label>
                    <input type='text' name='longitude' value={formData.longitude} onChange={onChangeFormData} required />
                    <br/>
                    <label>Temperature</label>
                    <input type='text' name='temperature' value={formData.temperature} onChange={onChangeFormData} required />
                    <br/>
                    <label>Timestamp</label>
                    <input type='text' name='timestamp' value={formData.timestamp} onChange={onChangeFormData} required />
                </div>
            </div>
            <br />
            {errorMessage ? <p className='error-text'>Error: {errorMessage}</p> : null }
            <br/>
            <button type='submit' style={{alignSelf: 'flex-end'}} >Add weather record</button>
        </Root>
    )
}

const Root = styled.form`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: 10px;

    & .top-container {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: flex-start;
    }

    .left-container, .right-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 10px;
        flex: 1;
    }

    & .error-text {
        color: var(--error);
    }
`