import './style.scss';

const Thumbnail = ({ imgsrc }) => {
    return (
        <div className='page-card grid-item'>
            <img src={imgsrc} width={'100%'} alt='' />
        </div>
    )
}

export default Thumbnail