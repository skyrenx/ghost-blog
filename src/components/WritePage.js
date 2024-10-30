import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

function WritePage() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    
    const postBlogEntry = async () => {
        const sanitizedContent = DOMPurify.sanitize(content);
        const sanitizeTitle = DOMPurify.sanitize(title);
        const sanitizeAuthor = DOMPurify.sanitize(author);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/blogEntries`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({title: sanitizeTitle, content: sanitizedContent, author: sanitizeAuthor})
                });
            if (!response.ok) throw new Error('Network response was not ok');
            await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        };
    }

    const handleClickSubmitButton = async (e) => {
        e.preventDefault();
        try{
            await postBlogEntry();
            console.log("post made!");
        } catch (error) {
            console.error('Error posting blog entry.');
        }
    }
    return (
        <form onSubmit={handleClickSubmitButton}>
            <div>
                <label>Author</label>
                <input
                    type='text'
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                    placeholder='author name'
                />
            </div>
            <div>
                <label>Title</label>
                <input
                    type='text'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder='blog title'
                />
            </div>
            <div>
                <label>Content</label>
                <ReactQuill theme='snow' value={content} onChange={setContent} placeholder='Write blog content here.'/>
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default WritePage