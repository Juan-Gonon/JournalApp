import { describe, expect, it } from 'vitest'
import { fileUpload } from '../../src/helpers/fileUpload'

describe('Prueba en fileUpload', () => {
  it('debe de subir el archivo correctamente a cloudinary', async () => {
    const imgUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3'
    const resp = await fetch(imgUrl)
    const blob = await resp.blob()
    const file = new File([blob], 'foto.jpg')
    const url = await fileUpload(file)

    expect(typeof url).toBe('string')
  })

  it('debe de retornar null', async () => {
    const file = new File([], 'foto.jpg')

    const url = await fileUpload(file)

    expect(url).toBe(null)
  })
})
