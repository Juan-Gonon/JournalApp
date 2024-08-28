import { beforeEach, describe, expect, it, vi } from 'vitest'
import { checkingAuthentication } from '../../../src/store/auth/thunks'
import { checkingCredentials } from '../../../src/store/auth'

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
})
