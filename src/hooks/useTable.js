import {useState} from 'react';

export const useTable = ( initLimit=10,initTotalItemsCount=3,initActivePage=1,initpageRangeDisplayed=3,initList={"count":0,"rows":[]}) => {

    const [limit, setLimit] = useState(initLimit);
    const [totalItemsCount, settotalItemsCount] = useState(initTotalItemsCount);
    const [activePage, setActivePage] = useState(initActivePage);
    const [list, setList] = useState(initList);
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(initpageRangeDisplayed);

    const changePage = async (pageNumber,resultList) => {

        setActivePage(pageNumber);
        setList(resultList);
        settotalItemsCount(resultList.count);
    }

    return [activePage,changePage,limit,totalItemsCount,pageRangeDisplayed,list] ;
}

