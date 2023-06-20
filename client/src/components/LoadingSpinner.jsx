export function LoadingSpinner ({ viewHeight }) {
  return (
    <div className=" container d-flex justify-content-center align-items-center black-bg-img flex-grow-1" style={{ height: viewHeight ? viewHeight : "50vh" }}>
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  )
}
