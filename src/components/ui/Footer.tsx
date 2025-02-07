
export default function Footer() {
  return (
    <footer className="bg-gray-100 bottom-0 border-t border-gray-300 mt-10">
      <div className="max-w-4xl mx-auto px-6 py-6 text-gray-700">
        

        {/* Garis Pemisah */}
        

        {/* Bagian Bawah */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} DipoFess. All rights reserved.</p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-blue-500 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
