/* eslint-disable react/prop-types */
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

export function ImageGallery ({ images }) {
  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      {images?.map((image) => (
        <ImageListItem key={image}>
          <img
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            alt='imagen de nota'
            loading='lazy' // carga perezosa
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
