import React from 'react';
import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
	document.title = `Project Manager - ${title}`;
  }, [title]);
}

export default useTitle;
