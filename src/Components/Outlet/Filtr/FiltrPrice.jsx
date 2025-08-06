import { useEffect, useRef, useState } from "react";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.min.css";
import "../../../css/PriceFilter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleMaxPrice,
  toggleMinPrice,
} from "../../../Redux/slices/booksSlices";

export function FiltrPrice() {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const { books } = useSelector((store) => store.bookSlice);
  const prices = books.length > 0 ? books.map((book) => book.price) : [0];
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  useEffect(() => {
    if (!sliderRef.current) return;

    if (sliderRef.current.noUiSlider) {
      sliderRef.current.noUiSlider.destroy();
    }

    noUiSlider.create(sliderRef.current, {
      start: [min, max],
      connect: true,
      range: {
        min,
        max,
      },
      format: {
        to: (value) => Math.round(value),
        from: (value) => Number(value),
      },
    });

    sliderRef.current.noUiSlider.on("update", (values) => {
      const [newMin, newMax] = values.map((v) => Number(v));
      setMinPrice(newMin);
      setMaxPrice(newMax);
      dispatch(toggleMinPrice(newMin));
      dispatch(toggleMaxPrice(newMax));
    });
  }, [min, max, dispatch]);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    setMinPrice(value);
    sliderRef.current.noUiSlider.set([value, null]);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    sliderRef.current.noUiSlider.set([null, value]);
  };

  return (
    <div className="filtr-group">
      <h3>Ціна </h3>
      <div className="price-inputs">
        <input type="number" value={minPrice} onChange={handleMinChange} />
        <span>–</span>
        <input type="number" value={maxPrice} onChange={handleMaxChange} />
      </div>
      <div className="slider-container">
        <div ref={sliderRef} className="price-slider" />
      </div>
    </div>
  );
}
