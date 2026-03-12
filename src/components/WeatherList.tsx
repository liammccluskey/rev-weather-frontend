import React from 'react'
import styled from 'styled-components'
import type { Weather } from '../providers/WeatherProvider'

interface Props {
    weathers: Weather[];
}

export const WeatherListComponent = (props: Props) => {
    const {weathers} = props

    const headers = ['Id', 'City name', 'Region', 'Latitude', 'Longitude', 'Temperature', 'Timestamp']
    const keys: (keyof Weather)[] = ['id', 'cityName', 'region', 'latitude', 'longitude', 'temperature', 'timestamp']

    return (
        <Root className='float-container'>
            <tr>
                {headers.map(header => (
                    <th key={header}>{header}</th>
                ))}
            </tr>
            {weathers.map(w => (
                <tr key={w.id}>
                    {keys.map(key => (
                        <td>{w[key]}</td>
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