import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

export const ImageCarousel = () => {
    return (
        <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            interval={6100}
            className='rounded-xl shadow-md'

        >
            <div>
                <img src="https://i.pravatar.cc/150" />
                <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center p-4">First Slide</div>
            </div>
            <div>
                <img src="https://i.pravatar.cc/150" />
                <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center p-4">Second Slide</div>
            </div>
            <div>
                <img src="https://i.pravatar.cc/150" />
                <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center p-4">Third Slide</div>
            </div>
        </Carousel>
    );
};