const addJobToProvider = async (providerId: string, data: FormData | any) => {
    return {
      title: data.title,
      description: data.description,
      imageURL: URL.createObjectURL(data.image),
    };
  };