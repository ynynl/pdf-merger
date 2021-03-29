const FileInput = ({handlefile}) => {
    return (
        <div>
            <input type="file" accept="image/*,.pdf" onChange={handlefile} />
        </div>
    )
}

export default FileInput