export type PageData = {
    data: {
      name: string | undefined;
      displayName: string | undefined;
      blocks:
        | {
            id: string;
            name: string;
            content: string;
          }[]
        | undefined;
    };
  };