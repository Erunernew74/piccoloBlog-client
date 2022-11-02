import React, { useRef, useState, useEffect } from 'react'
import './imageUploads.css'

//* Le props vengono passate dal file padre InsertPost.jsx
const ImageUploads = ({ setValidImage, file, setFile }) => {
    const [urlPreview, setUrlPreview] = useState()
    const inputFile = useRef()

    const handleInputImage = (e) => {
        let fileselezionato;
        if(e.target.files && e.target.files.length === 1) {
            fileselezionato = e.target.files[0]
            setFile(fileselezionato)
            setValidImage(true)
        }else {
            setValidImage(false)
        }
    }

    useEffect(() => {
        if(!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => setUrlPreview(fileReader.result)
    }, [file])

  return (
    <div>
        {urlPreview && (
            <img src={urlPreview}
                 alt="Preview"
                 style={
                    {maxWidth:'100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:'center'  
                 }
                }
             />
        )}

        {!urlPreview && <h3>Anteprima immagine</h3>}

        <input 
            type="file" 
            accept='.png, .jpg, .jpeg'
            style={{ display: "none" }}
            ref={inputFile}
            onChange={handleInputImage}
        />

        <input 
            type="button" 
            value="SELEZIONA UN'IMMAGINE"
            onClick={() => inputFile.current.click()}
        />

    </div>
  )
}

export default ImageUploads
