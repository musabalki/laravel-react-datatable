import axios from 'axios';
import React,{useState,useEffect} from 'react'
const SORT_ASC="asc";
const SORT_DESC="desc";

const Datatable = ({fetchUrl,columns}) => {
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [tableData,setTableData]=useState([]);
    const [sortField,setSortFiedl]=useState(columns[0]);
    const [sortOrder,setSortOrder]=useState(SORT_ASC);
    const [currentPage,setCurrentPage]=useState(1); 
    const [perPage,setPerPage] = useState(10)

    useEffect(()=>{
        const fetchData= async ()=>{
            const params = {
                sort_field:sortField,
                sort_order:sortOrder,
                per_page:perPage,
                page:currentPage
            }
        }
        axios.get(fetchUrl).then((response)=>setTableData(response.data.data));
        fetchData();
        //setTableData(data.data);
    },[sortField,sortOrder,perPage,currentPage])
    return (
        <div>
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        {
                            columns.map((column)=>{
                                return (<th key={column}>
                                    {column.toUpperCase().replace("_"," ")}
                                </th>)
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.length == 0 ? <tr><td>Kayıt bulunamadı</td></tr>:null
                    }
                    {loading ? (<tr>
                        <td colSpan={columns.length+1}>
                            <div className="d-flex justify-content-center">
                                <div className="spenner-border" role="status">
                                    <span className="sr-only">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        </td>

                    </tr>):(
                        tableData.map((tdata)=>{
                            return (
                                <tr key={tdata.id}>
                                    {columns.map((column)=>{
                                        return (<td key={column}>{tdata[column]}</td>)
                                    })}
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default Datatable
