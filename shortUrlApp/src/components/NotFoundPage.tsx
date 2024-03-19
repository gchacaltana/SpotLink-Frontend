import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='pageNotFound'>
      <h1>Error 404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/">Ir a la página de inicio</Link>
    </div>
  );
};

export default NotFoundPage;