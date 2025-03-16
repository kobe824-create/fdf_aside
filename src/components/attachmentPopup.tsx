"use client";
import React, { useState, useCallback } from "react";
import Button from "./button";
import { FileRejection, useDropzone } from "react-dropzone";
import axios from "axios";



interface MarkAttendancePopupProps {
    closePopup: () => void;
    id: string;
    setUpdate: React.Dispatch<React.SetStateAction<number>>;
}

export default function AttachmentPopup(props: MarkAttendancePopupProps) {
    const { closePopup, id, setUpdate } = props

    const [files, setFiles] = useState<{ file: File, preview: string }[]>([]);

    const handleContinue = async () => {
        console.log("Uploading files:", files); // Ensure files exist before sending
        const formData = new FormData();
        if (files.length > 0) {
            files.forEach(({ file }) => {
                console.log("Appending file:", file.name);
                formData.append("files", file); // Append files
            });
        } else {
            console.error("No files found!");
            return;
        }
    
        formData.append("id", id);
        
        try {
            const res = await axios.post("/api/attachments/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(res.data);
            closePopup();
            setFiles([]);
            setUpdate((prev: number) => prev + 1);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };
    

    const handleDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        // console.log(acceptedFiles);
        if (acceptedFiles.length > 0) {
            acceptedFiles.forEach((file) => {
                // Generate a preview URL for the file
                const preview = URL.createObjectURL(file);
                setFiles((prevFiles) => [...prevFiles, { file, preview }]);
            });
        }
        if (fileRejections.length > 0) {
            // toast.error("Some files were rejected:");
            fileRejections.forEach(({ file }) => {
                console.log(file.name);
            });
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 
            'application/pdf': []
        },
        onDrop: handleDrop,
        multiple: true,
    });




    return (
        <div className="mark-attendance-poppup"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="mark-attendance-success">
                <div className="login-page-heading">
                    <h2>Upload Attachment</h2>
                    <p>files should be pdfs</p>
                </div>
                <div
                    {...getRootProps(
                        { className: "add-attachment-input-cont" }
                    )}
                >
                    <p>Drag and drop files here</p>
                    <p>or</p>
                    <p>Click to select files</p>

                    <input type="file"
                        {...getInputProps()}
                    />

                </div>
                <div className="added-attachments">
                    {
                        files.map((file, index) => (
                            <div key={index} className="attachment-preview">
                                <img src={file.preview} alt="attachment" />
                            </div>
                        ))
                    }
                </div>
                <div className="parallel-btn">
                    <Button
                        label="Cancel"
                        onClick={() => {
                            setFiles([]);
                            closePopup()
                        }}
                        className="button-tertially"
                    />

                    {
                        files.length > 0 &&
                        <Button
                            label="Add Attachment"
                            onClick={handleContinue}
                            className="button-primary"
                        />
                    }

                </div>

            </div>
        </div>

    )
}