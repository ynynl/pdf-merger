import './style.scss'



const Topbar = (props) => {
    return (
        <div className='topbar'>
            {props.children}
        </div>
    )
}

export default Topbar