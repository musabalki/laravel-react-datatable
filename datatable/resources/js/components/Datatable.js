import React,{useState} from 'react'

const Datatable = ({fetchUrl,columns}) => {
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [tableData,setTableData]=useState([]);
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
                        tableData.map((data)=>{
                            return (
                                <tr key={data.id}>
                                    {columns.key((column)=>{
                                        return (<td key={column}>{data[column]}</td>)
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
