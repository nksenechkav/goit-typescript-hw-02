import React from 'react';
import css from './ImageGallery.module.scss';
import ImageCard from "../imageCard/ImageCard";
import { Image } from '../types';

interface ImageGalleryProps {
    images: Image[];
    onImgClick: (content: { modal: string; likes: number | null; alt_description: string; author: string }) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImgClick }) => {
    return (
        <ul className={css["image-gallery"]}>
            {images.map((image, index) => {
                return (
                    <li key={`${image.id}-${index}`}>
                        <ImageCard image={image} onImgClick={onImgClick} />
                    </li>
                );
            })}
        </ul>
    );
}

export default ImageGallery;

