import React, {useState} from 'react'
import ghostImage from '../resources/cowboyGhost-really-small.png'
import './NavigationHamburgerMenu.css'

function NavigationHamburgerMenu({getLinks}) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClickHamburgerIcon = () => {
        setMenuOpen(!menuOpen);
    }
    
    //Close the hamburger menu if a link was clicked
    const handleClickNavAnchor = (event) => {
        // if the clicked element is an anchor tag
        if(event.target.tagName === 'A'){
            setMenuOpen(false);
        };
    }

    //Close the hamburger menu if a link was clicked
    const handleClickAnchorImage = (event) => {
        // if the clicked element is an anchor tag or image tag
        if(event.target.tagName === 'A' ||
            event.target.tagName === 'IMG'
        ){
            setMenuOpen(false);
        };
    }

    let hamburgerIcon;
    menuOpen ? hamburgerIcon = 'X' : hamburgerIcon = '☰';
    return (
        <div className='navigationHamburgerMenu-topLevel' onClick={handleClickNavAnchor}>
            <div className='navigationBar-hamburgerNavBar'>
                <div className='navigationHamburgerNav'>
                    <div className='navigationHamburgerNav-container' ><a href="#" onClick={handleClickAnchorImage}>
                        <img className='ghostLogo' src={ghostImage} alt="A small cute cartoon ghost wearing a cowboy hat" />
                    </a><div className='navigationHamburgerNav-hamburgerIcon' onClick={handleClickHamburgerIcon}>{hamburgerIcon}</div></div>
                </div>
            </div>
            {menuOpen &&
                <div className="navigationHamburger-opened-container"><NavigationBarVertical getLinks={getLinks}/></div>
            }
        </div>
    )
}

function NavigationBarVertical({getLinks}){
    return (
        <div className='verticalNav'>
            <ul className="verticalNav-list">
                {getLinks()}
            </ul>
        </div>
    )
}

export default NavigationHamburgerMenu;