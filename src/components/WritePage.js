import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import './WritePage.css'

function WritePage() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [submissionCompleted, setSubmissionCompleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const postBlogEntry = async () => {
        const sanitizedContent = DOMPurify.sanitize(content);
        const sanitizeTitle = DOMPurify.sanitize(title);
        const sanitizeAuthor = DOMPurify.sanitize(author);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blog-entries`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: sanitizeTitle, content: sanitizedContent, author: sanitizeAuthor })
                });
            let json = await response.json();
            if (response.ok) {
                setSubmissionCompleted(true)
                setErrorMessage(null);
            }
            else {
                throw json;
            }

            
        } catch (errorResponse) {
            console.error('Fetch error:', errorResponse);
           displayValidationErrors(errorResponse)
        };
    }

    function displayValidationErrors( errorResponseJson){
        errorResponseJson.validationError ?
        setErrorMessage(errorResponseJson.validationError) : 
        setErrorMessage("An unexpected error occurred")
    }

    const handleClickSubmitButton = async (e) => {
        e.preventDefault();
        try {
            await postBlogEntry();
            
        } catch (error) {
        }
    }

    const handleClickNewEntryButton = async (e) => {
        e.preventDefault();
        setContent('');
        setAuthor('');
        setTitle('');
        setSubmissionCompleted(false);
    }

    return (
        <div className='write-page-content'>
            {submissionCompleted ? <div><h1 className='submission-confirmation'>Submission made!</h1><button className='custom-button' onClick={handleClickNewEntryButton}>Create new entry</button></div> :
                (<form onSubmit={handleClickSubmitButton} >
                    <div className='author-and-title-input'>
                        <div>
                            <label htmlFor='author'>Author</label>
                            <input
                                id='author'
                                type='text'
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='title'>Title</label>
                            <input
                                id='title'
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className='content-label'>Content</label>
                        <ReactQuill theme='snow' value={content} onChange={setContent} placeholder='Write blog content here.' />
                    </div>
                    <button type='submit' className='custom-button'>Submit</button>
                </form>)
            }

            {errorMessage ? <div className='error-messages'><h2>Something went wrong</h2><ul>
                {errorMessage.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul></div>
                : <div></div>
            }

        </div>

    )
}

export default WritePage