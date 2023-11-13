    REQCT QUERY

    1. Cache
        - Thời gian mặc định là 5 phút
        - useQuery
            + Lần đầu tiên hoặc sau khi hết thời gian cache
                isLoading: true -> false
                isFetching: true -> false

            + Các lần tiếp theo (chưa hết thời gian cache)
                isLoading: false -> false
                isFetching: true -> false

                * Hiển thị data cache trước, đồng thời fetch new data và update lên UI
                * Tăng UX
