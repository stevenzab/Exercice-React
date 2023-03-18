import React from "react";
import { IPage } from './interface'
import '../styles/page.css';

function Book() {
  const [pages, setPages] = React.useState<IPage[]>([]);

  const AddPage = () => {
    setPages([...pages, { type: 'text', content: '' }]);
  };

  React.useEffect(() => {
    const savedPages = localStorage.getItem('pages');
    if (savedPages) {
      setPages(JSON.parse(savedPages));
    }
  }, []);

  const AddImagePage = () => {
    setPages([...pages, { type: 'image', content: '' }]);
    localStorage.setItem('pages', JSON.stringify(pages));
  };

  const EditPage = (index: number, newContent: string) => {
    setPages(prevPages => {
      const newPages = [...prevPages];
      newPages[index].content = newContent;
      localStorage.setItem('pages', JSON.stringify(newPages));
      return newPages;
    });
  };

  const DeletePage = (index: number) => {
    setPages(prevPages => {
      const newPages = [...prevPages];
      newPages.splice(index, 1);
      localStorage.removeItem('pages')
      localStorage.setItem('pages', JSON.stringify(newPages));
      return newPages;
    });
  };

  return (
    <div className="book-container">
      <div className="page-container">
        {pages.map((page, index) => (
          <div className="page" key={index}>
            {page.type === 'text' ? (
              <textarea
                className="text-content"
                value={page.content}
                onChange={(e) => EditPage(index, e.target.value)}
              />
            ) : (
              <img className="image-content" src={page.content} alt="book-imagee" />
            )}
            <button className="delete-page" onClick={() => DeletePage(index)}>
              Delete Page
            </button>
          </div>
        ))}
        <div className="add-page-buttons">
          <button className="add-text-page" onClick={AddPage}>
            Add Text Page
          </button>
          <button className="add-image-page" onClick={AddImagePage}>
            Add Image Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default Book;