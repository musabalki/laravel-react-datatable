import React from 'react'
import Datatable from "./Datatable"
export default function App() {
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    Users List
            </div>
                <div className="card-body">
                <Datatable fetchUrl="api/users" columns={["name","email","address","created_at"]}></Datatable>
                </div>
            </div>
        </div>
    )
}
