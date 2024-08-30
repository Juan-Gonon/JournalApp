import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'
import { LoginPage } from '../../../src/auth/pages/LoginPage'
import { fireEvent, render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../../src/store'
import { MemoryRouter } from 'react-router-dom'
import { notAuthenticatedState } from '../../fixtures/authFixtures'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
})

describe('Pruebas en LoginPage', () => {
  it('debe de mostrar el componente correctamente', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </MemoryRouter>
    )

    // screen.debug()
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
  })

  it('botón de google debe de llamar el startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const googleBtn = screen.getByLabelText('google-btn')

    fireEvent.click(googleBtn)
  })
})
