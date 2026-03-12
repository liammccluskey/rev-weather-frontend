import React from 'react'
import { WeatherProvider } from './providers/WeatherProvider'
import { PageContainer } from './components/PageContainer'
import { BodyContainer } from './components/BodyContainer'
import { WeatherGalleryComponent } from './components/WeatherGallery'

function App() {

  return (
    <WeatherProvider>
      <PageContainer>
        <BodyContainer>
          <WeatherGalleryComponent />
        </BodyContainer>
      </PageContainer>
    </WeatherProvider>
  )
}

export default App
