import { Provider } from 'react-redux'
import { describe, expect, it, vi } from 'vitest'
import { LoginPage } from '../../../src/auth/pages/LoginPage'
import { fireEvent, render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../../src/store'
import { MemoryRouter } from 'react-router-dom'
import { notAuthenticatedState } from '../../fixtures/authFixtures'

const mockStartGoogleSignIn = vi.fn()
vi.mock('../../../src/store/auth/thunks', () => (
  {
    startGoogleSingIn: () => mockStartGoogleSignIn
  }
))

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
    // console.log(store.getState())
    fireEvent.click(googleBtn)
    // console.log(store.getState())
    expect(mockStartGoogleSignIn).toHaveBeenCalled()
  })
})
