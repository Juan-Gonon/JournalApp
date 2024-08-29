import { beforeEach, describe, expect, it, vi } from 'vitest'
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword, startLogout, startCreatingUserWithEmailPassword } from '../../../src/store/auth/thunks'
import { checkingCredentials, login, logout } from '../../../src/store/auth'
import { loginWithEmailPassword, logoutFirebase, registerUserEmailPassword, singInWithGoogle } from '../../../src/firebase/providers'
import { demoUser } from '../../fixtures/authFixtures'
import { clearNoteLogout } from '../../../src/store/journal'

vi.mock('../../../src/firebase/providers')

describe('Pruebas en AuthThunks', () => {
  const dispatch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('debe de invocar checkingCredentials', async () => {
    // console.log(checkingAuthentication())
    // const state = checkingCredentials()
    // console.log(state)
    const res = checkingAuthentication()
    await res(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })

  it('debe de ingresar con SingInGoogle', async () => {
    const loginData = {
      ok: true,
      ...demoUser
    }

    await singInWithGoogle.mockResolvedValue(loginData)
    await startGoogleSingIn()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  it('startGoogleSingIn debe de llamar checkingCredentials y logout - Error', async () => {
    const loginData = {
      ok: false,
      errorMessage: 'Un error en Google'
    }

    await singInWithGoogle.mockResolvedValue(loginData)
    await startGoogleSingIn()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  it('startLoginWithEmailPassword debe de llamar checkingCredential y login - Éxito', async () => {
    const loginData = {
      ok: true,
      ...demoUser
    }
    const formData = { email: demoUser.email, password: '123456' }

    await loginWithEmailPassword.mockResolvedValue(loginData)

    await startLoginWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(demoUser))
  })

  it('startLoginWithEmailPassword debe de llamar checkingCredential y logout - Error', async () => {
    const loginData = {
      ok: false,
      errorMessage: 'Un error en test login with email and password'
    }
    const formData = { email: demoUser.email, password: '123456' }

    await loginWithEmailPassword.mockResolvedValue(loginData)

    await startLoginWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }))
  })

  it('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {
    await startLogout()(dispatch)

    expect(logoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(logout({}))
    expect(dispatch).toHaveBeenCalledWith(clearNoteLogout())
  })

  it('startCreatingUserWithEmailPassword debe de llamar checkingCredential y register exitoso - login', async () => {
    const loginData = {
      ok: true,
      ...demoUser
    }

    await registerUserEmailPassword.mockResolvedValue(loginData)

    await startCreatingUserWithEmailPassword({ email: demoUser.email, password: '123456', displayName: demoUser.displayName })(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(demoUser))
  })

  it('startCreatingUserWithEmailPassword debe de llamar checkingCredential y register fallido - logout', async () => {
    const loginData = {
      ok: false,
      errorMessage: 'Un error en test login with email and password'
    }

    await registerUserEmailPassword.mockResolvedValue(loginData)

    await startCreatingUserWithEmailPassword({ email: demoUser.email, password: '123456', displayName: demoUser.displayName })(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }))
  })
})
