function fetchData(filter: string = "") {
  setDataEditor((prev) => ({
    ...prev,
    isFetchingNewData: true,
    isLoading: true,
  }));

  let filterQuery = "";

  if (filter !== "") {
    filterQuery = `?filter=firstName:like:${filter}`;
  }

  fetch(`${PUBLIC_REST_API}/customers${filterQuery}`).then((response) => {
    response.json().then((data) => {
      setDataEditor((prev) => ({
        ...prev,
        apiData: data.items,
        isFetchingNewData: false,
        isLoading: false,
      }));
    });
  });
}
