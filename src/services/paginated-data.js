import React, {useEffect, useState} from 'react';
import {getArtistList, getArtistListFiltered} from "./request";

function PaginatedList({dataUrl, renderItem, itemsPerPageOptions}) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getArtistListFiltered(currentPage, itemsPerPage);
            const countResponse = await getArtistList();
            setData(response.data);
            setTotalPages(Math.ceil(countResponse.data.length / itemsPerPage));
        };
        fetchData();
    }, [currentPage, itemsPerPage]);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const renderItems = () => {
        return data.map(renderItem);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className={i === currentPage ? 'active' : ''}>
                    <button onClick={() => handlePageChange(i)}>{i}</button>
                </li>
            );
        }
        return pageNumbers;
    };

    const renderItemsPerPageDropdown = () => {
        return (
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                {itemsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                        {`${option} items per page`}
                    </option>
                ))}
            </select>
        );
    };

    return (
        <div>
            {renderItemsPerPageDropdown()}
            {renderItems()}
            <ul className="pagination">{renderPageNumbers()}</ul>
        </div>
    );
}

export default PaginatedList;
