export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold text-gray-700">DSFR Tech</span> · by Daniel SFR
        </p>
        <p>Reviews honestos. Decisões inteligentes.</p>
      </div>
    </footer>
  )
}
