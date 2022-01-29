import { Button, CardMedia } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

import { getImageAPI } from 'src/services/api';
import { Input } from '../Input/Input';

interface ImageUploadProps {
  imageUrl: string;
  onSetFile: (file: any) => void;
  isBookFromIsbn: boolean;
}

const ImageUpload = ({
  imageUrl,
  onSetFile,
  isBookFromIsbn
}: ImageUploadProps) => {
  const [previewFile, setPreviewFile] = useState();

  useEffect(() => {
    if (imageUrl) {
      isBookFromIsbn && getImageFromUrl();
    } else {
      setPreviewFile(null);
    }
  }, [imageUrl]);

  const getImageFromUrl = async () => {
    const url = encodeURIComponent(imageUrl);
    getImageAPI(url).then((response) => {
      const stream = response.data;
      onSetFile(stream);
      //@ts-ignore
      setPreviewFile(window.URL.createObjectURL(stream));
    });
  };

  const onUploadImageClick = (event) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      onSetFile(event.target.files[0]);
      //@ts-ignore
      setPreviewFile(window.URL.createObjectURL(event.target.files[0]));
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      <Box
        alignItems="start"
        display="flex"
        justifyContent="start"
        flexDirection="column"
      >
        <Box>
          {previewFile && (
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              src={previewFile}
              // image={previewFile}
              alt=""
            ></CardMedia>
          )}
        </Box>
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={onUploadImageClick}
          />
          <Button
            style={{ marginTop: 5 }}
            color="primary"
            variant="contained"
            size="small"
            aria-label="upload picture"
            component="span"
            endIcon={<PhotoCamera />}
          >
            Upload cover
          </Button>
        </label>
      </Box>
    </Box>
  );
};

export default ImageUpload;
