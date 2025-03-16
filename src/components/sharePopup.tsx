"use client";
import Button from "./button";



interface MarkAttendancePopupProps {
    closePopup: () => void;
}

export default function SharePopup(props: MarkAttendancePopupProps) {
    const { closePopup } = props    
  



    return (
        <div className="mark-attendance-poppup"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="mark-attendance-success">
                        <div className="login-page-heading">
                            <h2>Your share is RWF 5000</h2>
                            <p>The Shares is your Total contribution minus your Penalties</p>
                        </div>
                        <Button
                            label="Close"
                            onClick={closePopup}
                            className="button-primary"
                        />

                    </div>
        </div>

    )
}