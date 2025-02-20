import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "./BannerSlider.css";

const BannerSlider = ({ bannerImages }) => {
    // If no images are provided, return null or a placeholder
    if (!bannerImages || bannerImages.length === 0) {
        return null;
    }

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            loop={true}
            className="banner-slider"
            style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
            }}
        >
            {bannerImages.map((image, index) => (
                <SwiperSlide key={index}>
                    <div
                        style={{
                            height: '500px',
                            position: 'relative',
                            backgroundColor: '#f5f5f5'
                        }}
                    >
                        <img
                            src={image.url} // Assuming each image object has a url property
                            alt={image.alt || `Banner ${index + 1}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/api/placeholder/1200/500'; // Placeholder image
                            }}
                        />
                        {image.caption && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '20px',
                                    background: 'rgba(0, 0, 0, 0.5)',
                                    color: '#fff',
                                }}
                            >
                                {image.caption}
                            </div>
                        )}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default BannerSlider;