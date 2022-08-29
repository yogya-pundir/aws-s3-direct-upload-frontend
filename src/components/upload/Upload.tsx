import { ChangeEvent, useState } from "react";
import './Upload.css';


const Upload = () => {

    const [img, setImg] = useState<File>();
    const [imgUrl, setImgUrl] = useState<string>();
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        if (!fileList) return;
        console.log(fileList[0]);
        setImg(fileList[0]);

    }

    const submitHandler = async () => {
        const apiResp = await fetch('http://localhost:8000/s3Url');
        console.log(apiResp);
        const url = await apiResp.json();

        fetch(url.url, {
            method: 'PUT',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: img
        }).then(data => {
            const imageUrl = data.url.split('?')[0];
            setImgUrl(imageUrl);
        })

        // console.log(uploadImgresp);
        // uploadImgresp.then(data =>{})

        // console.log('uploadapiResp',result);

    }

    return (
        <div>
            <input onChange={changeHandler} type='file'></input>
            <button onClick={submitHandler}>submit</button>
            {
                imgUrl && (
                    <img className="image-s3" src={imgUrl}></img>
                )
            }
        </div>
    )

}

export default Upload