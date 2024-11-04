import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';

function SearchPage() {
    const [blogEntries, setBlogEntries] = useState(null);
    const [pageCount, setPageCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // zero based

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

    }, [currentPage]);

    const getBlogTitles = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/find-all-titles?page=${currentPage}&size20&sort=createdAt,asc`)
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log('find-all-titles: ' + data)
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        };
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp); // Parse the timestamp

        // Get the day, month (as a string), and year
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' }); // Gets the short month name
        const year = date.getFullYear();

        return `${day} ${month} ${year}`; // Format as (3 Nov 2024)
    };

    const handleClickNextPage = (direction) => {

        if(direction == 'left'){
            return () => {(currentPage>0) && setCurrentPage(currentPage-1)};
        } else {
            return () => {(currentPage<pageCount-1) && setCurrentPage(currentPage+1)};
        }
    }

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

    const PageControls = () => {
        
        return (
            <div>
                <h1>Current page:
                    <div>
                        <button onClick={handleClickNextPage('left')} 
                        style={{ visibility: currentPage > 0 ? 'visible' : 'hidden' }}>
                            &lt;
                        </button>
                        <div className='page-count'>{currentPage + 1}</div>
                        <button onClick={handleClickNextPage('right')} 
                        style={{ visibility: currentPage < pageCount-1 ? 'visible' : 'hidden' }}>
                            &gt;
                        </button>
                    </div>
                </h1>
                <h1>Total pages: {pageCount}</h1>
            </div>
        )
    }

    return <div className='search-page-content'>
        <PageControls/>
        {blogEntries ? (
        blogEntries.map(entry => (
            <div key={entry.id} className='more-blog-titles'>
                <Link className='title-link' to={`/blog/${entry.id}`}><h2 >{entry.title}</h2></Link>
                <DateSection createDate={entry.createdAt} updateDate={entry.updatedAt}/>
            </div>
        ))
    ) : (
        <p>Loading...</p>
    )}
        
    </div>
}

export default SearchPage;