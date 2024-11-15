import React, {useState} from 'react'
import ghostImage from '../resources/cowboyGhost-really-small.png'
import './NavigationHamburgerMenu.css'

function NavigationHamburgerMenu() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClickHamburgerIcon = () => {
        setMenuOpen(!menuOpen);
    }
    
    const handleClickNavAnchor = (event) => {
        // if the clicked element is an anchor tag
        if(event.target.tagName === 'A'){
            setMenuOpen(false);
        };
    }

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
                <div className="navigationHamburger-opened-container"><NavigationBarVertical/></div>
            }
        </div>
    )
}

function NavigationBarVertical(){
    return (
        <div className='verticalNav'>
            <ul className="verticalNav-list">
                <li><a href="#write">Write</a></li>
                <li><a href="#search">Search</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </div>
    )
}

export default NavigationHamburgerMenu;