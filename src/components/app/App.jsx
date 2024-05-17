import { useState, useRef } from 'react'
import { useEffect } from 'react';
import SearchBar from '../searchBar/SearchBar'
import ImageGallery from '../imageGallery/ImageGallery'
import { fetchImagesWithQuery } from '../api/images-api.ts';
import ErrorMessage from '../error/ErrorMessage'
import LoaderComponent from '../loader/LoaderComponent';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn';
import ImageModal from '../imageModal/ImageModal';

import './App.css'



  function App() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const loadMoreBtnRef = useRef(null);


    const onSubmit = (query) => {
       setImages([]);
       setTotalPages(null);
       setPage(1);
       setQuery(query);
    }
  
    const onLoadMore = () => {
      setPage((prevPage) => prevPage + 1);
    }
  
    useEffect(() => {
      if (!query) return;
      async function fetchImages (){
        try {
          setError(false);
          setLoading(true);
          const data = await fetchImagesWithQuery(query, page);
          if (data.results.length === 0) {
            return;
          }
          setTotalPages(data.total_pages);
          setImages((prevImages) => [...prevImages, ...data.results]);
          setShowBtn(data.total_pages && data.total_pages !== page);
        } catch (error) {
          setError(true);
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      }
      fetchImages();
    }, [query, page]);


    useEffect(() => {
      if (loadMoreBtnRef.current) {
        loadMoreBtnRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [images]);
    

    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setModalContent({});
      setIsOpen(false);
    }

    function clickOpenModal(content) {
      setModalContent(content);
      openModal();
    }
  

  return (
    <div className='gallery-container'>
       <SearchBar onSearch={onSubmit}/>
       {loading && <LoaderComponent />}
       {error && <ErrorMessage />}
       {images.length > 0 && <ImageGallery images={images} onImgClick={clickOpenModal} />}
       <ImageModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        content={modalContent}
      />
       {showBtn && page < totalPages && <LoadMoreBtn onLoadMore={onLoadMore} />} 
       <div ref={loadMoreBtnRef} />
    </div>
  )
}

export default App
