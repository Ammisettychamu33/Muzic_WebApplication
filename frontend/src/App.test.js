import {render, screen} from '@testing-library/react'
import App from './App'

describe('Music Vibes App', () => {
  test('renders Music Vibes home page', () => {
    render(<App />)

    expect(screen.getByText(/Welcome to Music Vibes/i)).toBeInTheDocument()
  })
})