import React from 'react';
import {NavigateBefore, NavigateNext} from '@material-ui/icons'
import '../styles/main.scss'
import Person1 from '../assets/images/person1.jpg'
import Person2 from '../assets/images/person2.jpg'
import SliderItem from "./sliderItem";
import TextService from '../config/textService'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class SliderShow extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            slider: 0
        }
    }
    changeView = () => {
        const node = this.myRef.current;
        if (node && this.state.slider === 1) {
            node.slickGoTo(0, false);
            this.setState({slider: 0});
        } else if (node && this.state.slider === 0 ) {
            node.slickGoTo(1, false);
            this.setState({slider: 1});
        }
    };

    render() {
        const items = [{
            "image": Person1,
            "title": TextService.text.personTitle1,
            "content": TextService.text.personDesc1,
            "side": false
        }, {
            "image": Person2,
            "title": TextService.text.personTitle2,
            "content": TextService.text.personDesc2,
            "side": true
        }];
        const settings = {
            dots: true,
            infinite: true,
            arrows: false,
            fade: true,
            slidesToShow: 1,
            swipeToSlide: true,
        };
        return (
            <div className={'sliderContainer'}>
                <NavigateBefore onClick={this.changeView} fontSize={'large'} className={'leftArrow'}/>
                <Slider {...settings} ref={this.myRef}>
                    {items.map((item) => {
                        return <SliderItem key={item.title} item={item}/>
                    })}
                </Slider>
                <NavigateNext onClick={this.changeView} fontSize={'large'} className={'rightArrow'}/>
            </div>
        );
    }
};

export default SliderShow;