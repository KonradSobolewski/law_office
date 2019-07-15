import React,{} from 'react';
import '../styles/main.scss'

const SliderItem = (props: any) => {
    return (
        <div className={'slideItemContainer'}>
            {props.item.side === false &&  <img className={'slideImage'} src={props.item.image} alt={''}/>}
            <div className={'slideTextContainer'}>
                <h2 className={'slideTitle'}>
                    {props.item.title}
                </h2>
                <div>
                    {props.item.content}
                </div>
            </div>
            {props.item.side === true &&  <img className={'slideImage'}  src={props.item.image} alt={''}/>}
        </div>
    )
};

export default SliderItem;