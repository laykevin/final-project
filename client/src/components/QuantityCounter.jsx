import { HiPlus, HiMinus } from 'react-icons/hi';

export default function QuantityCounter ({ quantity, setQuantity }) {
  return (
    <div className="border border-secondary d-inline-block p-3 position-relative rounded mt-3">
      <div className="input-group position-absolute top-0 start-0 translate-middle-y ms-3 d-flex">
        <small className="fw-bold text-uppercase m-1 bg-white pt-1" style={{ lineHeight: '1.1rem' }}>Quantity<small className="d-block fw-normal mb-2" style={{ lineHeight: '0.5rem' }}>(Limit: 5)</small></small>
      </div>
      <div className="input-group">
        <button className="btn btn-outline-secondary" onClick={() => quantity > 1 && setQuantity(Number(quantity) - 1)} disabled={quantity === 1}>
          <HiMinus />
        </button>
        <span className="input-group-text border border-secondary px-3 fw-bold">{quantity}</span>
        <button className="btn btn-outline-secondary" onClick={() => quantity < 5 && setQuantity(Number(quantity) + 1)} disabled={quantity === 5}>
          <HiPlus />
        </button>
      </div>
    </div>
  )
}
