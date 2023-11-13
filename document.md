    REQCT QUERY

    1. Cache
        - Thời gian mặc định là 5 phút
        - Điều chỉnh thời gian cache trong tham số thứ 3 của useQuery hook:
            + cacheTime: 5000 // 5 giây

        - Khi call api thông qua useQuery:
            + Lần đầu tiên hoặc sau khi hết thời gian cache
                isLoading: true -> false
                isFetching: true -> false

            + Các lần tiếp theo (chưa hết thời gian cache)
                isLoading: false -> false
                isFetching: true -> false (call lại api ở background)

                * Hiển thị data cache trước, đồng thời fetch new data và update lên UI
                * Tăng UX

    2. Stale Time:
        - Nhằm hạn chế việc call lại api ở background:
            + Biết rõ data không thay đổi thường xuyên
            + Hạn chế call lên server

        - Điều chỉnh thời gian call lại api trong tham số thứ 3 của useQuery hook:
            + staleTime: 30000

        - Khi call api thông qua useQuery:
            + Lần đầu tiên hoặc sau khi hết thời gian cache
                isLoading: true -> false
                isFetching: true -> false

            + Các lần tiếp theo chưa hết thời gian stale
                isLoading: false -> false
                isFetching: false -> false (KO call lại api)

            + Các lần tiếp theo đã hết thời gian stale nhưng chưa hết thời gian cache
                isLoading: false -> false
                isFetching: true -> false (call lại api ở background)
