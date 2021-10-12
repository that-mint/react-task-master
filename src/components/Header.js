import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {

    return (
        // Use the props.title object and the button.js file
        <header className='header'>
            <h1>{title}</h1>
            <Button text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
        </header>
    )
}

// Default props
Header.defaultProps = {
    title: "Task Master",
}

Header.propTypes = {
    title: PropTypes.string,
}

// css in js
// const headingStyle = {
//     color: "#000"
//     //backgroundColor: "#2E3440"
// }

export default Header
