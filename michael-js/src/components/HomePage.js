import './HomePage.css'
import cowboyGhostImage from '../resources/cowboyGhost.png'

function HomePage() {
    return (<div>
            This is the home page. 
            <img src={cowboyGhostImage} alt="Image of a cute cartoon ghost wearing a cowboy hat" className='homepage-image' />
        </div>)
}

export default HomePage