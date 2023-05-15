import { HiPlus, HiMinus } from 'react-icons/hi';

export function QuantityCounter ({ quantity, setQuantity, bgColor, disable }) {
  return (
    <div className="border border-secondary d-inline-block p-3 position-relative rounded mt-3">
      <div className="input-group position-absolute top-0 start-0 translate-middle-y ms-3 d-flex">
        <small title="Limit: 5" className="fw-bold text-uppercase m-1 pt-1" style={{ lineHeight: '1.1rem', backgroundColor: bgColor ? 'rgb(0, 0, 0, 0.4)' : 'white' }}>
          Quantity
          <small className="d-block fw-normal mb-2" style={{ lineHeight: '0.5rem' }}>(Limit: 5)</small>
        </small>
      </div>
      <div className="input-group">
        <button className="btn btn-outline-secondary" onClick={() => quantity > 1 && setQuantity(Number(quantity) - 1)} disabled={quantity === 1 || disable}>
          <HiMinus />
        </button>
        <span className="input-group-text border border-secondary px-3 fw-bold">{quantity}</span>
        <button className="btn btn-outline-secondary" onClick={() => quantity < 5 && setQuantity(Number(quantity) + 1)} disabled={quantity === 5 || disable}>
          <HiPlus />
        </button>
      </div>
    </div>
  )
}
