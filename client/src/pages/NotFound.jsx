import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="position-relative container d-flex justify-content-center align-items-center black-bg-img flex-grow-1" style={{ height: "50vh" }}>
      <h2 className="position-absolute top-0 start-0 text-white">404 Not Found</h2>
      <img className="img-fluid w-50" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/80e19859-e026-4a30-a9fe-0a16d9cb41bb/defgfai-ca4de65c-144c-4514-991e-bbdfec33d670.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgwZTE5ODU5LWUwMjYtNGEzMC1hOWZlLTBhMTZkOWNiNDFiYlwvZGVmZ2ZhaS1jYTRkZTY1Yy0xNDRjLTQ1MTQtOTkxZS1iYmRmZWMzM2Q2NzAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.E_S3g7dBVaaIj0pG9HGdhNsObSVpuoWT7G8sggVhgsU" alt="sad mario" />
    </div>
  )
}
