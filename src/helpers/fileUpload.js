export const fileUpload = async (file) => {
  if (!file) throw new Error('No tenemos ningún archivo a subir')
  const cloudUrl = 'https://api.cloudinary.com/v1_1/drwyq8qqc/upload'

  const formDate = new FormData()
  formDate.append('upload_preset', 'react-journal')
  formDate.append('file', file)

  try {
    const res = await fetch(cloudUrl, {
      method: 'POST',
      body: formDate
    })
    if (!res.ok) throw new Error('No se pudo subir imagen')

    const cloudResp = await res.json()

    return cloudResp.secure_url
  } catch (error) {
    throw new Error(error.message)
  }
}
