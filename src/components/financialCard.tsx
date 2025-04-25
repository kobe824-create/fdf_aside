export default function FinancialCard(props: { label: string, amount: number, onclick: () => void, style?: React.CSSProperties }) {
    const { label, amount, onclick, style } = props;


    return (
        <div className="financial-card"
            style={style}
            onClick={onclick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.1109 11.6667L16.7969 12.2983C16.9463 12.4451 17.0209 12.5185 16.9946 12.5808C16.9684 12.6432 16.8628 12.6432 16.6516 12.6432H14.0646C12.7402 12.6432 11.6665 13.6984 11.6665 15.0001C11.6665 15.2935 11.721 15.5743 11.8207 15.8334M13.8887 18.3334L13.2028 17.7019C13.0534 17.5551 12.9787 17.4817 13.005 17.4193C13.0313 17.357 13.1369 17.357 13.3481 17.357H15.9351C17.2595 17.357 18.3332 16.3018 18.3332 15.0001C18.3332 14.7067 18.2786 14.4258 18.179 14.1667" stroke="#534FEB" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18.3259 9.58341C18.3332 9.0828 18.3332 8.94632 18.3332 8.33341C18.3332 5.19072 18.3332 3.61937 17.3569 2.64306C16.3805 1.66675 14.8092 1.66675 11.6665 1.66675H8.33317C5.19047 1.66675 3.61913 1.66675 2.64281 2.64306C1.6665 3.61937 1.6665 5.19072 1.6665 8.33341C1.6665 11.4761 1.6665 13.0475 2.64281 14.0238C3.61913 15.0001 5.19047 15.0001 8.33317 15.0001H9.1665" stroke="#534FEB" strokeLinecap="round" />
                <path d="M15.4165 8.3335H15.409" stroke="#534FEB" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.58301 8.3335H4.57552" stroke="#534FEB" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.0832 8.33333C12.0832 9.48393 11.1504 10.4167 9.99984 10.4167C8.84924 10.4167 7.9165 9.48393 7.9165 8.33333C7.9165 7.18274 8.84924 6.25 9.99984 6.25C11.1504 6.25 12.0832 7.18274 12.0832 8.33333Z" stroke="#534FEB" />
            </svg>
            <p>{label}</p>
            <h3>RWF {amount}</h3>
        </div>
    );
}