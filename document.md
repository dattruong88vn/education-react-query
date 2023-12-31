    useQuery
        - Tham số:
                + useQuery nhận vào 3 tham số:
                    * Tham số thứ nhất: là unique key, có thể là string hoặc array string.
                    * Tham số thứ hai: là funciton để call api, trả về một promise,
        - Giá trị trả về:
            + Là một object chứa các thông tin như error, isError, isLoading, data, isFetching...

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

        7. Tham số của useQuery hook:
            7.1. Tham số thứ nhất: unique key
                - Giá trị có thể là
                    + string: "super-hero"
                    + array: ["super-hero", heroId]

            7.2. Tham số thứ hai: callback function
                - Viết dưới dạng arrow funciton để truyền tham số vào
                    () => fetchApi(heroId)

                - Viết dưới dạng thu gọn và nhận vào 1 tham số là 1 object
                    + Object này có 1 key là queryKey, value chính là array các unique key được truyền vào useQuery qua tham số thứ nhất

        8. Keep previous data:
            - Thêm vào option config field: keepPreviousData = true
            - Sử dụng cho trường hợp call data kiểu phân trang --> thay vì show loading sẽ show data của page trước đó

    useQueries
        1. Tác dụng
            - Multiple dynamic query
            - Ví dụ:
                + Nhận vào 1 list ID, mỗi ID cần call 1 api --> sử dụng useQuery

        2. Cách dùng
            - Tham số:
                + useQueries nhận vào 1 tham số là array các object
                + Mỗi object bao gồm 2 key:
                    queryKey: là unique key, có thể là string hoặc array string, tương tự tham số thứ nhất của useQuery
                    queryFn: là funciton để call api, trả về một promise, tương tự tham số thứ hai của useQuery

            - Giá trị trả về:
                + Là Array các response tương tự như useQuery
                + Bao gồm các key như error, isError, isLoading, data, isFetching...
