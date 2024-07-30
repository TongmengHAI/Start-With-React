import PropTypes from 'prop-types';
import './category.css';

export default function CategoryCard({ name, image, price }) {
  return (
    <>
      <div className="category_card">
        <img className="category_image" src={image} alt={name} />
        <div className="category_info">
          <span className="category_name">{name}</span>
          <span className="category_price"> {price}$</span>
        </div>
      </div>
    </>
  );
}

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

