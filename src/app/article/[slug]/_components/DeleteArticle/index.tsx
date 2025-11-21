"use client"

export const DeleteArticle = ({ action }: { action: Function }) => {
  return (
    <button
      className="btn btn-sm btn-outline-danger"
      onClick={() => {
        if (confirm("Are you sure want to delete the article?")) action();
      }}
    >
      <i className="ion-trash-a"></i> Delete Article
    </button>
  );
};
