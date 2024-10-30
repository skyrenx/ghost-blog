import React, {useState, useEffect} from 'react';
import './HomePage.css'
import cowboyGhostImage from '../resources/cowboyGhost.png'



function HomePage() {
    const [blogEntries, setBlogEntries] = useState(null);

    const getBlogEntries = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/blogEntries`)
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data._embedded.blogEntries;
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        };
    }

    useEffect(() => { getBlogEntries().then(entries => setBlogEntries(entries)) }, []);

    return (<div>
        This is the home page.
        <div>
            {blogEntries ? (
                blogEntries.map(entry => (
                    <div key={entry.id}>
                        <h2>{entry.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: entry.content}}></p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
        <img src={cowboyGhostImage} alt="A cute cartoon ghost wearing a cowboy hat" className='homepage-image' />
    </div>)
}

export default HomePage