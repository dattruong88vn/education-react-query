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

    3. Refetch
        - refetchOnMount:
            + Call api khi mount component
            + Value: true | false | 'always'

        - refetchOnWindowFocus:
            + Call api khi user focus vào cửa sổ có hiển thị component
            + Value: true | false | 'always'

        - refetchInterval:
            + Call Api sau mỗi n giây
            + Value: true | false | number

        - refetchIntervalInBackground:
            + Sử dụng kết hợp với refetchInterval, call api ngầm sau mỗi n giây.


    4. Fetch API by event
        - Thêm enabled: false vào option config trong useQuery
        - Destructure function refresh từ useQuery
        - Handle event bằng function này.

    5. Callback sucess và callback error
        - Define 2 function onCallback và onError
        - Thêm vào option config của useQuery 2 field: onSuccess và onError bằng chính 2 fn vừa define
        - Params tương ứng của 2 fn này chính là data (success) và error (failed)

    6. Transformation data
        - Cấu trúc data từ api trả về có thể khác với yêu cầu ở FE
        - useQuery cung cấp 1 option để có thể xử lý cấu trúc data ngay khi nhận được từ API
        - Sử dụng key select trong option config:
            + Là 1 function, có tham số là data từ API
            + Return về data mà bạn muốn transform theo yêu cầu ở FE
