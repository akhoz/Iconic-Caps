import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function DragFileArea() {
    const [lastUploadedFile, setLastUploadedFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const lastFile = acceptedFiles[acceptedFiles.length - 1];
        console.log(lastFile);
        setLastUploadedFile(URL.createObjectURL(lastFile));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div
            {...getRootProps()}
            className={`flex items-center justify-center rounded-lg overflow-hidden w-1/2
            ${lastUploadedFile ? '' : 'border border-gray-300 '}`}
        >
            <input {...getInputProps()} className="w-fit"/>
            {!lastUploadedFile && (
                <p className="text-center w-full py-2 px-3">
                    Drag the product image here
                </p>
            )}
            {lastUploadedFile && (
                <img src={lastUploadedFile} alt="Uploaded File" className="w-1/2 h-1/2 object-cover rounded-lg" />
            )}
        </div>
    );
}

export default DragFileArea;