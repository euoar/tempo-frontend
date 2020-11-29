import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import styled from 'styled-components';

// estilos para pantallas grandes
const StyledCarousel = styled.div.attrs({
  className: "Carousel",
})`
  img {
      opacity: 0.9;
  }
`;
/**
 * Necesita que se la pasen por props un array con los atributos de las imágenes
 */
class CustomCarousel extends Component {
  constructor(props) {
    super();
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    // Slides creados desde las props recibidas
    const slides = this.props.items.map((item, index) => {
      return (
        <CarouselItem className="rounded" key={index}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption className="d-block" captionText={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <StyledCarousel>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}>
          <CarouselIndicators items={this.props.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </StyledCarousel>
    );
  }
}

export default CustomCarousel;