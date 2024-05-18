export interface Image {
    id: string;
    urls: {
      regular: string;
      small: string;
    };
    alt_description: string;
    likes: number | null;
    author: string;
  }