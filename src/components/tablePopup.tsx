import { TableProps } from "@/utils/types";
import Button from "./button";
import Table from "./table";


interface TablePopupProps {
    data: TableProps;
    close: () => void;
}


export default function TablePopup(props: TablePopupProps) {
    const { data, close } = props;
    return (
        <div className="table-popup"
            onClick={(e) => e.stopPropagation()}
        >
            <Table
               data={data}
            />
            <Button
                label="Close"
                onClick={close}
                className="button-tertially"
            />
        </div>
    )
}