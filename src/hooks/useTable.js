import {useState} from 'react';

export const useTable = (initPage=1, initLimit=10,initTotalItemsCount=3,initActivePage=1,pageRangeDisplayed=3,initList={"count":0,"rows":[]}) => {
    const [page, setPage] = useState(initPage);
    const [limit, setLimit] = useState(initLimit);
    const [totalItemsCount, settotalItemsCount] = useState(initTotalItemsCount);
    const [activePage, setActivePage] = useState(initActivePage);
    const [list, setList] = useState(initList);

    const changePage = async (pageNumber,resultList) => {
        setPage(pageNumber);
        setActivePage(pageNumber);
        //let resultList=await callback();
        setList(resultList);
        settotalItemsCount(resultList.count);
    }

    return [ page,changePage,limit,totalItemsCount,settotalItemsCount,activePage,list,setList];
}

