import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import './HomePage.css'



function HomePage() {
    const [displayedBlogEntry, setDisplayedBlogEntry] = useState(null);
    const {id} = useParams(); // url param "id" is stored into this variable.
    
    const getNewestBlogEntry = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/public/latest-blog-entry`);
            
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        };
    }

    const getBlogEntryById = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/public/blog-entries/${id}`)
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        };
    }

    useEffect(() => { 
        id ? getBlogEntryById().then(featuredBlogEntry => setDisplayedBlogEntry(featuredBlogEntry))
        : getNewestBlogEntry().then(featuredBlogEntry => setDisplayedBlogEntry(featuredBlogEntry))
    }, [id]);

    return (<div className='homepage-content'>
        <div>
            {displayedBlogEntry ? (
                    <div key={displayedBlogEntry.id} className='featured-blog'>
                        <h2>{displayedBlogEntry.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: displayedBlogEntry.content}}></p>
                    </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    </div>)
}

export default HomePage