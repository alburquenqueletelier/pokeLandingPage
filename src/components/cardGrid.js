import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Importa los estilos para el efecto blur
import { CSSTransition } from 'react-transition-group'; // Importa CSSTransition

const CardGrid = ({ name, image }) => {

    const [loadingImg, setLoadingImg] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = () => {
        setLoadingImg(false);
    };

    const handleError = () => {
        setLoadingImg(true); // Considera la imagen como cargada (sin éxito)
        setError(true); // Marca que hubo un error
        console.error("Error loading image:", image); // Usa console.error para errores
    };


    return (
        <div>
            {
                loadingImg && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
            }
            <Link to={`/pokedex/${name}`} className={loadingImg ? "d-none text-decoration-none" : "d-block text-decoration-none"}>
                <div className="card" style={{ width: "18rem" }}>
                    <h5 className="card-header">{name}</h5>
                    <div className="card-body">
                        <LazyLoadImage
                            src={image}
                            alt={name}
                            effect="blur" // Aplica un efecto blur mientras se carga la imagen
                            onLoad={handleLoad} // Establece imageLoaded a true cuando la imagen se carga
                            onError={handleError}
                            useIntersectionObserver={true}
                            className="pokemon-image" // Clase para la imagen
                        />
                        <CSSTransition
                            in={loadingImg}
                            timeout={300} // Duración de la transición
                            classNames="fade-in" // Clases para la transición
                            unmountOnExit // Elimina el componente del DOM cuando termina la transición
                        >
                            <img src={image} className="card-img-top" alt={name} onLoad={handleLoad} onError={() => handleError(image)} />
                        </CSSTransition>
                        {error && <p className="text-danger">Error al cargar la imagen.</p>}
                    </div>
                </div>
            </Link>

        </div>
    )
};

export default CardGrid