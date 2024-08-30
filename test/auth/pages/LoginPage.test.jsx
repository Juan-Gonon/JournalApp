import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'
import { LoginPage } from '../../../src/auth/pages/LoginPage'
import { render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../../src/store'
import { MemoryRouter } from 'react-router-dom'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
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
})
