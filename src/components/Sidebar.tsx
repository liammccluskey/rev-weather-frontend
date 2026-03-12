import React from 'react'
import styled from 'styled-components'

interface Props {
    cityName: string;
    region: string;
    onChangeCityName: (event: any) => void;
    onChangeRegion: (event: any) => void;
    onSubmitSearch: (event: any) => Promise<void>;
}

export const SidebarComponent = (props: Props) => {
    const {
        cityName,
        region,

        onChangeCityName, // string => void
        onChangeRegion, // string => void
        onSubmitSearch,
    } = props

    return (
        <Root onSubmit={onSubmitSearch} className='float-container'>
            <label>City name</label>
            <input type='text' value={cityName} onChange={onChangeCityName} name='cityName' />
            <br/>
            <label>Region</label>
            <input type='text' value={region} onChange={onChangeRegion} name='region' />
            <br/>
            <br />
            <button type='submit'>Search</button>
        </Root>
    )
}

const Root = styled.form`
    display: flex;
    flex-direction: column;
    align-items: stretch;;
    justify-content: flex-start;
    width: 300px;
    padding: 15px;
`