import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function WritePage() {
    const [value, setValue] = useState('type here');
    return (
        <div>
            <ReactQuill theme='snow' value={value} onChange={setValue}/>
        </div>
    )
}

export default WritePage