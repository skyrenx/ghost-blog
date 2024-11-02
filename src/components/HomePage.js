import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import './HomePage.css'



function HomePage() {
    const [blogEntries, setBlogEntries] = useState(null);
    const [displayedBlogEntry, setDisplayedBlogEntry] = useState(null);
    const {id} = useParams();
    console.log('id: '+ id);
    
    const getNewestBlogEntry = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/latest-blog-entry`)
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blog-entries/${id}`)
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        };
    }

    const getBlogTitles = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/find-all-titles`)
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                console.log(data)
                return data;
            } catch (error) {
                console.error('Fetch error:', error);
                return [];
            };
    }

    useEffect(() => { 
        getBlogTitles().then(entries => setBlogEntries(entries));
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

            <h1 className='underlined-heading'>More blog entries</h1>
            {blogEntries ? (
                blogEntries.map(entry => (
                    <div key={entry.id} className='more-blog-titles'>
                        <Link to={`/blog/${entry.id}`}><h2 >{entry.title}</h2></Link>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    </div>)
}

export default HomePage