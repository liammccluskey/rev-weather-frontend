import React from 'react'
import { BookProvider } from './providers/BookProvider'
import { PageContainer } from './components/PageContainer'
import { BodyContainer } from './components/BodyContainer'
import { BookGalleryComponent } from './components/BookGalleryComponent'

function App() {

  return (
    <BookProvider>
      <PageContainer>
        <BodyContainer>
          <BookGalleryComponent />
          
        </BodyContainer>
      </PageContainer>
    </BookProvider>
  )
}

export default App
