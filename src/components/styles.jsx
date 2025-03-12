import React from 'react';

const styles = {
  jsx: `
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }

    .team-swiper .swiper-button-next,
    .team-swiper .swiper-button-prev {
      color: #4F46E5;
    }

    .team-swiper .swiper-pagination-bullet {
      background: #4F46E5;
    }

    .team-swiper .swiper-pagination-bullet-active {
      background: #4F46E5;
    }
  `
};

export default styles;