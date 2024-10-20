import React, {FC, useState} from "react";

interface QrCodeProps
{
    image: string | null;
    url: string;
}


const QrCode: FC<QrCodeProps> = ({image, url}) => {

    const [file, setFile] = useState<File | null>(null);
    const [changedUrl, setChangedUrl] = useState<string>(url);
    const qrCodeUrl = "https://shd.nissel.it/qr-code/";
    const [uploadedFile, setUploadedFile] = useState<string | null>(null);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;

        setFile(selectedFile);

        if( selectedFile )
        {
            console.log('Uploading file...');

            const formData = new FormData();
            formData.append('imagefile', selectedFile);

            try
            {
                // You can write the URL of your server or any other endpoint used for file upload
                const result = await fetch(qrCodeUrl + "upload.php", {
                    method: 'POST',
                    body: formData,
                });

                const resultData = await result.json();
                if( resultData.message === 'success' )
                {
                    setUploadedFile(resultData.fileName);
                }
                console.log(resultData);
            }
            catch(error)
            {
                console.error(error);
            }
        }
    };

    const handleUrlChanged = (input: React.ChangeEvent<HTMLInputElement>) => {
        setChangedUrl(input.target.value);
    }

    const generateQrCodeUrl: string = qrCodeUrl + "image.php?";
    const urlParameter: string = "url=" + changedUrl.replace(/#/g, '%23');
    const imageUploaded: string = uploadedFile ? uploadedFile : image ? image : "";
    const imageParameter: string = "logoFilename=" + imageUploaded;

    console.log(generateQrCodeUrl + urlParameter + "&" + imageParameter)
    return (
        <div>
            <img alt="QR-Code" src={generateQrCodeUrl + urlParameter + "&" + imageParameter} width={250}/>

            <p><a href={changedUrl} className="App-link">{changedUrl}</a></p>
            <div className="input-group">
                <input id="url" type="text" defaultValue={url} onInput={handleUrlChanged}/>
                <input id="file" type="file" accept="image/png, image/gif, image/jpeg, image/webp" onChange={handleUpload}/>
            </div>
            {file && (
                <p>{file.name} ({file.size} bytes)</p>
            )}
        </div>
    );
}

export default QrCode;