export default function Custom404() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center ">
      <h1 className="text-9xl font-extrabold text-textColor tracking-widest">
        404
      </h1>
      <div className="bg-accent px-2 text-sm rounded rotate-12 absolute">
        Az oldal nem található
      </div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-textColor group active:text-secondary focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-muted group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-accent border border-current">
            <router-link to="/">Kezdőlap</router-link>
          </span>
        </a>
      </button>
    </main>
  );
}
