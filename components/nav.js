export default function Nav() {
    return (
      <header className="flex justify-between items-center w-full px-4 py-2 fixed top-0 bg-white shadow z-10">
        <div className="flex-grow-0">
          <p className="text-xl font-bold text-black">Logo</p>
        </div>
        <div className="flex-grow justify-center hidden sm:flex">
          <input
            type="text"
            className="form-input w-full max-w-md"
            placeholder="Search Country or City..."
          />
        </div>
        <div className="flex-grow-0">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Log In
          </button>
        </div>
      </header>
    );
  }
  