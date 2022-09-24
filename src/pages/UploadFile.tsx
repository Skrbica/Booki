import { useNavigate } from "react-router-dom";
import { setFile } from './Book';

export default function UploadFile(){
    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        if(files){
            setFile(files[0]);
            navigate('/book');
        }
    }

    return (
        <>
        <label htmlFor="text" className="drop-container">
            <span className="drop-title">Drop file here</span>
            <input type="file" id="images" accept="text/*" required onChange={handleChange}/>
        </label>
        </>
    );
}