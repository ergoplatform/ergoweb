export interface New {
  id: number;
  attributes: {
    tag: string;
    title: string;
    author: string;
    date: string;
    content: string;
    spotlight: boolean;
    type: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    subtitle: string;
    url: string;
    permalink: string;
  };
}
