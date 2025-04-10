import { ReactNode, useEffect, useState } from "react";
import FilterPopup from "./filterPopup";
import { TableProps } from "@/utils/types";


export default function Table(props: { data: TableProps }) {

    const { data } = props;
    const [popupDisplay, setPopupDisplay] = useState(false);

    const [displayDatas, setDisplayDatas] = useState<(string | ReactNode)[][]>([]);


    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Logic to get the current items based on the page
    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const currentDatas = displayDatas.slice(indexOfFirstData, indexOfLastData);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        setDisplayDatas(data.tableData);
        setCurrentPage(1);
    }, [data]);

    const search = (search: string) => {
        if (search === "") {
            setDisplayDatas(data.tableData);
        } else {
            const filtered = data.tableData.filter((data: (string | ReactNode)[]) => {
                return data.some((value: string | ReactNode) => {
                    return value != null && value.toString().toLowerCase().includes(search.toLowerCase());
                });
            });
            setDisplayDatas(filtered);
        }
        setCurrentPage(1); // Reset to first page when searching
    }

    return (
        <div className="table">
            <div className="popup-background"
                style={{ display: popupDisplay ? "flex" : "none" }}
                onClick={() => {
                    setPopupDisplay(false);
                }}
            >
                <FilterPopup
                    closePopup={() => setPopupDisplay(false)}
                />
            </div>
            {
                data.title && (
                    <h2>{data.title}</h2>
                )
            }

            <div className="table-heading">
                <div className="search-input">
                    <input
                        type="text"
                        placeholder={data.searchWords ? "Search by " + data.searchWords?.join(", ") : "Search by " + data.tableHeaders.join(", ").replace(/,/g, ", ").replace("Actions", "").replace("View More", "")}
                        onChange={(e) => {
                            search(e.target.value);
                        }}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M15.8045 14.8625L11.8252 10.8831C12.9096 9.55686 13.4428 7.86453 13.3144 6.15617C13.1861 4.44782 12.406 2.85415 11.1356 1.70481C9.86516 0.555472 8.20158 -0.0616068 6.48895 -0.0187856C4.77632 0.0240356 3.14566 0.723481 1.93426 1.93487C0.72287 3.14627 0.0234252 4.77693 -0.019396 6.48956C-0.0622172 8.20219 0.554862 9.86577 1.7042 11.1362C2.85354 12.4066 4.44721 13.1867 6.15556 13.315C7.86392 13.4434 9.55625 12.9102 10.8825 11.8258L14.8619 15.8051C14.9876 15.9266 15.156 15.9938 15.3308 15.9922C15.5056 15.9907 15.6728 15.9206 15.7964 15.797C15.92 15.6734 15.9901 15.5062 15.9916 15.3314C15.9932 15.1566 15.926 14.9882 15.8045 14.8625ZM6.66652 12.0005C5.61169 12.0005 4.58054 11.6877 3.70348 11.1016C2.82642 10.5156 2.14283 9.68265 1.73916 8.70811C1.3355 7.73357 1.22988 6.66122 1.43567 5.62665C1.64145 4.59208 2.14941 3.64178 2.89529 2.8959C3.64117 2.15002 4.59147 1.64206 5.62604 1.43628C6.6606 1.23049 7.73296 1.33611 8.7075 1.73977C9.68204 2.14344 10.515 2.82703 11.101 3.70409C11.6871 4.58115 11.9999 5.6123 11.9999 6.66713C11.9983 8.08113 11.4359 9.43676 10.436 10.4366C9.43615 11.4365 8.08052 11.9989 6.66652 12.0005Z" fill="#727A90" />
                    </svg>
                </div>
                {/* <div className="table-heading-right-side">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <g clipPath="url(#clip0_220_4188)">
                                <path d="M0 12.6667C0.00105857 13.5505 0.352588 14.3977 0.97748 15.0226C1.60237 15.6475 2.4496 15.999 3.33333 16.0001H12.6667C13.5504 15.999 14.3976 15.6475 15.0225 15.0226C15.6474 14.3977 15.9989 13.5505 16 12.6667V6.66675H0V12.6667ZM11.3333 9.66675C11.5311 9.66675 11.7245 9.7254 11.8889 9.83528C12.0534 9.94516 12.1815 10.1013 12.2572 10.2841C12.3329 10.4668 12.3527 10.6679 12.3141 10.8618C12.2755 11.0558 12.1803 11.234 12.0404 11.3739C11.9006 11.5137 11.7224 11.6089 11.5284 11.6475C11.3344 11.6861 11.1334 11.6663 10.9507 11.5906C10.7679 11.5149 10.6117 11.3868 10.5019 11.2223C10.392 11.0579 10.3333 10.8645 10.3333 10.6667C10.3333 10.4015 10.4387 10.1472 10.6262 9.95964C10.8138 9.7721 11.0681 9.66675 11.3333 9.66675ZM8 9.66675C8.19778 9.66675 8.39112 9.7254 8.55557 9.83528C8.72002 9.94516 8.84819 10.1013 8.92388 10.2841C8.99957 10.4668 9.01937 10.6679 8.98079 10.8618C8.9422 11.0558 8.84696 11.234 8.70711 11.3739C8.56726 11.5137 8.38907 11.6089 8.19509 11.6475C8.00111 11.6861 7.80004 11.6663 7.61732 11.5906C7.43459 11.5149 7.27841 11.3868 7.16853 11.2223C7.05865 11.0579 7 10.8645 7 10.6667C7 10.4015 7.10536 10.1472 7.29289 9.95964C7.48043 9.7721 7.73478 9.66675 8 9.66675ZM4.66667 9.66675C4.86445 9.66675 5.05779 9.7254 5.22224 9.83528C5.38669 9.94516 5.51486 10.1013 5.59055 10.2841C5.66623 10.4668 5.68604 10.6679 5.64745 10.8618C5.60887 11.0558 5.51363 11.234 5.37377 11.3739C5.23392 11.5137 5.05574 11.6089 4.86176 11.6475C4.66778 11.6861 4.46671 11.6663 4.28398 11.5906C4.10126 11.5149 3.94508 11.3868 3.8352 11.2223C3.72532 11.0579 3.66667 10.8645 3.66667 10.6667C3.66667 10.4015 3.77202 10.1472 3.95956 9.95964C4.1471 9.7721 4.40145 9.66675 4.66667 9.66675Z" fill="#727A90" />
                                <path d="M12.6667 1.33333H12V0.666667C12 0.489856 11.9298 0.320286 11.8047 0.195262C11.6797 0.0702379 11.5101 0 11.3333 0C11.1565 0 10.987 0.0702379 10.8619 0.195262C10.7369 0.320286 10.6667 0.489856 10.6667 0.666667V1.33333H5.33333V0.666667C5.33333 0.489856 5.2631 0.320286 5.13807 0.195262C5.01305 0.0702379 4.84348 0 4.66667 0C4.48986 0 4.32029 0.0702379 4.19526 0.195262C4.07024 0.320286 4 0.489856 4 0.666667V1.33333H3.33333C2.4496 1.33439 1.60237 1.68592 0.97748 2.31081C0.352588 2.93571 0.00105857 3.78294 0 4.66667L0 5.33333H16V4.66667C15.9989 3.78294 15.6474 2.93571 15.0225 2.31081C14.3976 1.68592 13.5504 1.33439 12.6667 1.33333Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_220_4188">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        Select Month
                    </button>
                    <button
                        onClick={() => setPopupDisplay(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M0.667566 3.16715H2.49138C2.85135 4.49158 4.21681 5.27344 5.54124 4.91348C6.39187 4.68228 7.05637 4.01779 7.28756 3.16715H15.3328C15.7009 3.16715 15.9994 2.86871 15.9994 2.50056C15.9994 2.13241 15.7009 1.83397 15.3328 1.83397H7.28756C6.9276 0.509511 5.56214 -0.272348 4.23771 0.0876158C3.38708 0.318812 2.72258 0.983308 2.49138 1.83394H0.667566C0.299416 1.83394 0.000976562 2.13238 0.000976562 2.50053C0.000976562 2.86868 0.299416 3.16715 0.667566 3.16715Z" fill="#727A90" />
                            <path d="M15.3328 7.33374H13.5089C13.1497 6.0095 11.785 5.2272 10.4607 5.58642C9.60943 5.81736 8.94437 6.48239 8.71342 7.33374H0.667566C0.299416 7.33374 0.000976562 7.63218 0.000976562 8.00033C0.000976562 8.36848 0.299416 8.66692 0.667566 8.66692H8.71342C9.07267 9.99117 10.4374 10.7735 11.7616 10.4143C12.6129 10.1833 13.278 9.51828 13.5089 8.66692H15.3328C15.7009 8.66692 15.9994 8.36848 15.9994 8.00033C15.9994 7.63218 15.7009 7.33374 15.3328 7.33374Z" fill="#727A90" />
                            <path d="M15.3328 12.8328H7.28756C6.9276 11.5084 5.56214 10.7266 4.23771 11.0865C3.38708 11.3177 2.72258 11.9822 2.49138 12.8328H0.667566C0.299416 12.8328 0.000976562 13.1313 0.000976562 13.4994C0.000976562 13.8676 0.299416 14.166 0.667566 14.166H2.49138C2.85135 15.4904 4.21681 16.2723 5.54124 15.9123C6.39187 15.6811 7.05637 15.0167 7.28756 14.166H15.3328C15.7009 14.166 15.9994 13.8676 15.9994 13.4994C15.9994 13.1313 15.7009 12.8328 15.3328 12.8328Z" fill="#727A90" />
                        </svg>
                        Filters
                    </button>
                </div> */}

            </div>
            <table>
                <thead>
                    <tr>
                        <th>S/N</th>
                        {
                            data.tableHeaders.map((header, index) => {
                                return <th key={index}>{header}</th>

                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        currentDatas.map((row, index) => {
                            return (
                                <tr key={index}
                                    onClick={() => {
                                        if (data.onRowClick) {
                                            data.onRowClick(index);
                                        }
                                    }}
                                >
                                    <td>{index + 1 + ((currentPage - 1) * itemsPerPage)}</td>
                                    {
                                        row.map((cell, idex) => {
                                            return data.type === 'normal' ? ["present", "absent", "absent excused", "late", "very late", "excused", "paid", "unpaid"].includes(String(cell)) ?
                                                (<td key={idex}>
                                                    <p className={`cont-${cell}`}>
                                                        {cell}
                                                    </p>
                                                </td>
                                                ) : (
                                                    <td key={idex}>{cell}</td>
                                                ) :
                                                idex === 0 ? (<td key={idex}>{cell}</td>) :
                                                    (
                                                        <td key={idex}
                                                            style={{
                                                                backgroundColor: cell === "red" ? "#EC5243" : "#12AE47",
                                                                borderRight: '1px solid #E0E0E0',
                                                            }}
                                                        ></td>
                                                    )
                                        })

                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="table-bottom">
                {
                    displayDatas && displayDatas.length === 0 && (
                        <p>No data found</p>
                    )
                }
                {displayDatas.length > itemsPerPage && (
                    <>
                        <p>Showing {(currentPage - 1) * itemsPerPage + 1}-{currentPage * itemsPerPage < data.tableData.length ? currentPage * itemsPerPage : data.tableData.length} from {data.tableData.length}</p>
                        <div className="pagination">

                            <div className="page" onClick={() => {
                                if (currentPage > 1) {
                                    paginate(currentPage - 1)
                                }
                            }
                            } style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                    <path d="M4.86015 9.3934L1.14015 5.66673C1.01598 5.54183 0.946289 5.37286 0.946289 5.19673C0.946289 5.02061 1.01598 4.85164 1.14015 4.72673L4.86015 1.00007C4.9534 0.906047 5.07253 0.841927 5.20236 0.815881C5.3322 0.789834 5.46684 0.803042 5.58914 0.85382C5.71143 0.904598 5.81584 0.990645 5.88904 1.10099C5.96224 1.21134 6.00092 1.34098 6.00015 1.4734V8.92007C6.00092 9.05248 5.96224 9.18212 5.88904 9.29247C5.81584 9.40282 5.71143 9.48887 5.58914 9.53965C5.46684 9.59042 5.3322 9.60363 5.20236 9.57758C5.07253 9.55153 4.9534 9.48741 4.86015 9.3934Z" fill="#727A90" />
                                </svg>
                            </div>
                            {Array.from({ length: Math.ceil(displayDatas.length / itemsPerPage) }, (_, index) => (
                                <div key={index} className={`page ${currentPage === index + 1 ? "active" : ""}`} onClick={() => paginate(index + 1)}>
                                    <p>{index + 1}</p>
                                </div>
                            ))}


                            <div className="page" onClick={() => {
                                if (currentPage < Math.ceil(displayDatas.length / itemsPerPage)) {
                                    paginate(currentPage + 1);
                                }
                            }} style={{ cursor: currentPage === Math.ceil(displayDatas.length / itemsPerPage) ? 'not-allowed' : 'pointer' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                    <path d="M1.13985 9.3934L4.85985 5.66673C4.98402 5.54183 5.05371 5.37286 5.05371 5.19673C5.05371 5.02061 4.98402 4.85164 4.85985 4.72673L1.13985 1.00007C1.0466 0.906047 0.927473 0.841927 0.79764 0.815881C0.667801 0.789834 0.53316 0.803042 0.410852 0.85382C0.288544 0.904598 0.184135 0.990645 0.110939 1.10099C0.0377384 1.21134 0 1.34098 0 1.4734V8.92007C0 9.05248 0.0377384 9.18212 0.110939 9.29247C0.184135 9.40282 0.288544 9.48887 0.410852 9.53965C0.53316 9.59042 0.667801 9.60363 0.79764 9.57758C0.927473 9.55153 1.0466 9.48741 1.13985 9.3934Z" fill="#727A90" />
                                </svg>
                            </div>
                        </div>
                    </>)
                }
            </div>
        </div>
    );
}