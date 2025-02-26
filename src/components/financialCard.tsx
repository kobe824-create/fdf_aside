export default function FinancialCard(props: { label: string, amount: number, onclick: () => void }) {
    const { label, amount, onclick } = props;


    return (
        <div className="financial-card"
            onClick={onclick}
        >
            <div className="financial-png-cont"></div>
            <p>{label}</p>
            <h3>RWF {amount}</h3>
        </div>
    );
}