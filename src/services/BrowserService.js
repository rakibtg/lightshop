const BrowserService = (title, append = true) => {
  if (append) title += " - Light Shop";
  document.title = title;
};

export default BrowserService;
