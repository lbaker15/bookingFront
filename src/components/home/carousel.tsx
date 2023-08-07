import React, { useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
// import { Swiper, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
const Slide = React.forwardRef((ref: any) => {
  return (
    <div ref={ref} className={`b-team__item swiper-slide js-team__slide`}>
      <div className={`b-team__image`}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/440px-Image_created_with_a_mobile_phone.png ' />
      </div>
      <div className={`b-team__text`}>
        <div className={`b-team__text__inner`}>
          <h2 className={`b-team__title`}>Title</h2>
          <p className={`b-team__subtitle`}>Position</p>
        </div>
      </div>
    </div>
  );
});
const Carousel = ({ id, parentClass, classes, styles, title, items }: any) => {
  const [init, setInit] = React.useState(false);
  const wrapper = React.useRef(null);
  const container: any = React.useRef(null);
  const slides: any = React.useRef([]);
  const swiperRef = React.useRef(null);

  useEffect(() => {
    gsap.set(wrapper.current, { display: 'block' });
    slides.current.forEach((slide: any, i: any) => {
      const wWidth = window.innerWidth;
      const sWidth = slide.getBoundingClientRect().width;
      const center = wWidth / 2 - sWidth / 2;

      const xSm = center - 20;
      const xMd = center;
      const xLg = center + 20;
      const x = i % 3 === 0 ? xSm : i % 3 === 1 ? xLg : xMd;
      const y = i % 3 === 0 ? '2%' : i % 3 === 1 ? '0%' : '-2%';
      console.log(sWidth, wWidth, x, center);
      gsap.set(slide, { position: 'absolute', x: x, y: y });
      if (i === slides.current.length - 1) {
        gsap.to(wrapper, { display: 'flex' });
      }
    });
  }, []);
  useEffect(() => {
    if (swiperRef.current) {
      console.log('here');
      const swiper: any = new Swiper(swiperRef.current, {
        slidesPerView: 'auto',
        // speed: 0,
        freeMode: {
          sticky: true,
          enabled: true,
          // momentum: false,
          // momentumRatio: 1,
        },
        autoplay: false,
        spaceBetween: 30,
        grabCursor: true,
      });
      swiper.on('touchMove', () => {
        Touch();
      });
      swiper.on('touchStart', () => {
        console.log('start');
        zoom('in', swiper.init);
      });
      swiper.on('touchEnd', () => {
        Touch();
        zoom('out', swiper.init);
      });
    }
  }, [swiperRef]);
  console.log(init);
  const zoom = (direction: string, init: any) => {
    if (init) {
      if (direction === 'out') {
        slides.current.forEach((slide: any) => {
          const img = slide.querySelector('.b-team__image img');

          gsap.to(img, { scale: 1, duration: 0.5 });
        });
      } else {
        slides.current.forEach((slide: any) => {
          const img = slide.querySelector('.b-team__image img');
          console.log(img);
          gsap.to(img, { scale: 1.25, duration: 0.5 });
        });
      }
    }
  };
  const handleClick = () => {
    if (!init) {
      const tl = gsap.timeline();
      slides.current.forEach((slide: any, i: any) => {
        const x = i * (slide.getBoundingClientRect().width + 40);
        const image = slide.querySelector('.b-team__image img');
        const slidePosition = x;
        const slideWidth = slide.offsetWidth;
        const slideCenter = slidePosition + slideWidth / 2;
        const distanceFromCenter = window.innerWidth / 2 - slideCenter;

        tl.to(
          slide,
          {
            x: x,
            y: 0,
            duration: 2,
            ease: 'power2.out',
          },
          0
        );
        tl.to(image, { x: distanceFromCenter / 5 }, '-=2');

        if (i === slides.current.length - 1) {
          tl.to(wrapper.current, { display: 'flex' });
        }
      });
      setInit(true);
    }
  };

  const Touch = () => {
    slides.current.forEach((slide: any) => {
      const image = slide.querySelector('.b-team__image img');
      const slidePosition = slide.getBoundingClientRect().left;
      const slideWidth = slide.offsetWidth;
      const slideCenter = slidePosition + slideWidth / 2;
      const distanceFromCenter = window.innerWidth / 2 - slideCenter;
      gsap.set(image, { x: distanceFromCenter / 5 });
    });
  };

  return (
    <section ref={container} onClick={handleClick} id={id} className={`c-section b-team ${classes}`} data-id={id}>
      <div className={`b-team__cursor js-team__cursor`}></div>
      <div className={`b-team__inner`}>
        <div ref={swiperRef} className='swiper-container'>
          <div className='swiper-wrapper'>
            {[...Array(3)].map((item, i) => {
              // const ref = (slides.current[i] = useRef(null));
              return (
                <div key={i} ref={(el) => (slides.current[i] = el)} className={`b-team__item swiper-slide js-team__slide`}>
                  <div className={`b-team__image`}>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/440px-Image_created_with_a_mobile_phone.png' />
                  </div>
                  <div className={`b-team__text`}>
                    <div className={`b-team__text__inner`}>
                      <h2 className={`b-team__title`}>Title</h2>
                      <p className={`b-team__subtitle`}>Position</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
