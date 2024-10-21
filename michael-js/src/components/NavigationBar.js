import React, {useRef, useState, useEffect } from 'react';
import './NavigationBar.css'
import ghostImage from '../resources/cowboyGhost-really-small.png'


function NavigationBar() {
    const listRef = useRef(null);
    const [currentComponent, setCurrentComponent] = useState('hiddenNavBarHorizontal');
    // Contains the name of the component that will be rendered.
    let currentComponentRenderedOnce = useRef(false);


    const componentsMap = new Map([
        ['hiddenNavBarHorizontal', HiddenNavigationBarHorizontal],
        ['navBarHorizontal', NavigationBarHorizontal],
        ['navBarHamburgerMenu', NavigationHamburgerMenu],
    ]);


    useEffect(() => {
        setCurrentComponent(getNavComponent());
        const handleResize = () => {
            setCurrentComponent('hiddenNavBarHorizontal');
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if(currentComponent == 'hiddenNavBarHorizontal' ){
            setCurrentComponent(getNavComponent());
        }
    },[currentComponent]);

    const getNavComponent = () => {
        let newNavComponent;
        checkOverflow() ? 
        newNavComponent = 'navBarHamburgerMenu' :
        newNavComponent = 'navBarHorizontal';
        return newNavComponent
    }        
    
    const checkOverflow = () => {
        if(listRef.current){
            //window.requestAnimationFrame(() => {
                const hasOverflow = listRef.current.scrollWidth > listRef.current.clientWidth;
                return hasOverflow;
            //})
            
        }
    };

    
    const ActiveComponent = componentsMap.get(currentComponent);
    return (
        <nav ref={listRef} className="navigationBar">
               <ActiveComponent/>
            </nav>
    )

}

function HiddenNavigationBarHorizontal(){
    return (
        <ul className="navigationBar-list" style={{visibility: 'hidden'}}>
                <li><a href="#">
                <img className="ghostLogo" src={ghostImage} alt="A small cute cartoon ghost wearing a cowboy hat"/>
                    </a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#about">About</a></li>
            </ul>
    )
}

function NavigationBarHorizontal(){
    return (
        <ul className="navigationBar-list">
                <li><a href="#">
                <img className="ghostLogo" src={ghostImage} alt="A small cute cartoon ghost wearing a cowboy hat"/>
                    </a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#about">About</a></li>
            </ul>
    )
}

function NavigationHamburgerMenu() {
    let menuOpen = false;
    return (
        <div className="navigationHamburgerMenu">
            {menuOpen ? 
                <div>------------</div>
            
            :
                (<div className="navigationHamburgerMenu-container"><a href="#">
                    <img className="ghostLogo" src={ghostImage} alt="A small cute cartoon ghost wearing a cowboy hat"/>
                        </a><div>☰</div></div>)
            }
        </div>
            
    )
}

export default NavigationBar