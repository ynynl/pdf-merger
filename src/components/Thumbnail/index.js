import './style.scss';
import DeleteAlt from 'baseui/icon/delete-alt'

const Thumbnail = ({ imgsrc, pageId, handleDelete }) => {

    return (
        <div className='page-card grid-item'>
            <div className='delete'>
                <DeleteAlt size={24}  onClick={()=> handleDelete(pageId)}/>
            </div>
            <img src={imgsrc} width={'100%'} alt='' />
        </div>
    )
}

export default Thumbnail