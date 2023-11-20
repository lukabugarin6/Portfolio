export default function Footer() {
  return (
    <footer className="py-[40px] px-[40px] md:px-[50px] flex justify-end">
      <a
        target="_blank"
        className="transition-all duration-300 uppercase tracking-wider text-xs text-gray-500 hover:text-gray-700 mx-5"
        href="https://github.com/lukabugarin6/Portfolio"
      >
        github
      </a>
      <a
        target="_blank"
        className="transition-all duration-300 uppercase tracking-wider text-xs text-gray-500 hover:text-gray-700 ml-5"
        href="https://www.linkedin.com/in/luka-bugarin-77028a1b5/"
      >
        linkedin
      </a>
    </footer>
  );
}