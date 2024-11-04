import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';

function SearchPage() {
    const [blogEntries, setBlogEntries] = useState(null);
    const [pageCount, setPageCount] = useState(null);

    useEffect(() => {
        let response = getBlogTitles().then((response) => 
            { 
                setBlogEntries(response.blogTitles); 
                setPageCount(response.pageCount);  
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                setBlogEntries([]);
            })

    }, []);

    const getBlogTitles = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/find-all-titles`)
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log('find-all-titles: ' + data)
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        };
    }

    //TODO: Update the database to just store dates in the correct format.
    // I have no need for the full timestamp.
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp); // Parse the timestamp

        // Get the day, month (as a string), and year
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' }); // Gets the short month name
        const year = date.getFullYear();

        return `${day} ${month} ${year}`; // Format as (3 Nov 2024)
    };

    const DateSection = ({createDate, updateDate}) => {

        let formattedCreatedDate = formatTimestamp(createDate);
        let formattedUpdateDate = formatTimestamp(updateDate);
        if(formattedCreatedDate == formattedUpdateDate){
            return <div> 
                Created: {formattedCreatedDate}
            </div>
        }
        else {
            return <div>
            Created: {formattedCreatedDate} Updated: {formattedUpdateDate}
        </div>
        }

    }

    const PagedResults = () => {
        
    }

    return <div className='search-page-content'>{blogEntries ? (
        blogEntries.map(entry => (
            <div key={entry.id} className='more-blog-titles'>
                <Link className='title-link' to={`/blog/${entry.id}`}><h2 >{entry.title}</h2></Link>
                <DateSection createDate={entry.createdAt} updateDate={entry.updatedAt}/>
            </div>
        ))
    ) : (
        <p>Loading...</p>
    )}
    <h1>Page count: {pageCount}</h1>
    </div>
}

export default SearchPage;