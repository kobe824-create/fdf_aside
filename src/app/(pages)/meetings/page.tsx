"use client";
import Button from "@/components/button";
import Table from "@/components/table";

export default function Meetings() {
    return (
        <div className="meeting-page">

            <div className="meeting-body">
                <h2>
                    Meetings Dashboard
                    <Button
                        label="Create New Metting"
                        onClick={() => {
                            console.log("Sign In");
                        }}
                        className="button-primary"
                    />
                </h2>
                <div className="overview-tables">
                    <Table
                        data={{
                            tableHeaders: ["Name", "Status", "CheckIn time"],
                            tableData: [
                                ["John Darcey", "Absent", "07:30 PM"],
                                ["John Darcey", "Present", "06:00 PM"],
                                ["John Darcey", "Absent", "07:30 PM"],
                                ["John Darcey", "Present", "06:00 PM"],
                                ["John Darcey", "Absent", "07:30 PM"],
                                ["John Darcey", "Present", "06:00 PM"],
                                ["John Darcey", "Absent", "07:30 PM"]
                            ],
                            type: "normal"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}