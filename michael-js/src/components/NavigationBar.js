import './NavigationBar.css'

function NavigationBar() {
    return (

        <nav className="navigationBar">
            <ul className="navigationBar-list">
                <li><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </nav>

    )
}

export default NavigationBar