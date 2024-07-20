import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import Pagination from 'react-bootstrap/Pagination';

const PokePagination = () => {
    const { store, actions } = useContext(Context);
    const totalPages = store.pokeNames.length / 30 | 0;
    const currentPage = store.page;

    const renderPaginationItems = () => {
        const items = [];
        let startPage, endPage;

        if (totalPages <= 7) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage <= 4) {
            startPage = 1;
            endPage = 7;
        } else if (currentPage + 3 >= totalPages) {
            startPage = totalPages - 6;
            endPage = totalPages;
        } else {
            startPage = currentPage - 3;
            endPage = currentPage + 3;
        }

        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => actions.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }
        return items;
    };

    return (
        <Pagination>
            <Pagination.First onClick={()=>actions.setPage(1)} />
            <Pagination.Prev onClick={()=>actions.setPage(store.page-1)} disabled={(store.page-1) <= 1}/>
            {renderPaginationItems()}
            <Pagination.Next onClick={()=>actions.setPage(store.page+1)} disabled={(store.page+1) >= store.pokeNames.lenght/30 | 0}/>
            <Pagination.Last onClick={()=>actions.setPage(store.pokeNames.lenght/30 | 0)}/>
        </Pagination>
    )
};

export default PokePagination;
