"useclient";
import { useEffect, useState } from "react";
import Button from "./button";
import SelectFormField from "./selectFormField";
import axios from "axios";

interface FilterPopupProps {
    closePopup: () => void;
    id: string;
    updateData: () => void;
}

export default function UpdateContributionPopup(props: FilterPopupProps) {
    const { closePopup, id, updateData } = props;

    const [error, setError] = useState<string | null>(null);

    const initialContributionState = {
        year: "all",
        month: "all",
        amount: 0,
        userId: id
    }

    const [user, setUser] = useState<{ monthlyContributionAmount: string}>({
        monthlyContributionAmount: ""
    });

    const [contribution, setContribution] = useState(initialContributionState);


    const formValidation = () => {
        if (contribution.year === "all") {
            setError("Please select a year");
            return false;
        }
        if (contribution.month === "all") {
            setError("Please select a month");
            return false;
        }
        if (contribution.amount === 0) {
            setError("Please select an amount");
            return false;
        }
        return true;
    };

    const handleApply = async () => {  
        if (!formValidation()) {
            return;
        }
        try {
            const response = await axios.post("/api/contributions/create", contribution);
            if (response.status === 201) {
                updateData();
                setContribution(initialContributionState);
                closePopup();
                setError(null);
            }
        } catch (error: unknown) {
            setContribution(initialContributionState);
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred");
            }
        }

    };

    useEffect(() => {
        axios.post("/api/users/getOne", { id })
            .then((response) => {
                setUser(response.data.user);
                setContribution({ ...contribution, amount: Number(response.data.user.monthlyContributionAmount) });
            })
            .catch((error) => {
                console.error("Error fetching user", error);
            });
    }, [id]);

    return (
        <div className="filter-pop-up-container"
            onClick={(e) => e.stopPropagation()}
        >
            <h2>Filter</h2>
            {
                error && <p className="error">{error}</p>
            }
            <fieldset className="filter-pop-up-fieldset">
                <SelectFormField
                    label="Year"
                    options={[
                        { value: "all", label: "All" },
                        { value: "2021", label: "2021" },
                        { value: "2022", label: "2022" },
                        { value: "2023", label: "2023" },
                        { value: "2024", label: "2024" },
                        { value: "2025", label: "2025" },
                        { value: "2026", label: "2026" },
                        { value: "2027", label: "2027" },
                        { value: "2028", label: "2028" },
                        { value: "2029", label: "2029" },
                        { value: "2030", label: "2030" },
                    ]}
                    value={contribution.year}
                    onChange={(e) => setContribution({ ...contribution, year: e.target.value })}
                />
                <SelectFormField
                    label="Month"
                    options={[
                        { value: "all", label: "All" },
                        { value: "1", label: "January" },
                        { value: "2", label: "February" },
                        { value: "3", label: "March" },
                        { value: "4", label: "April" },
                        { value: "5", label: "May" },
                        { value: "6", label: "June" },
                        { value: "7", label: "July" },
                        { value: "8", label: "August" },
                        { value: "9", label: "September" },
                        { value: "10", label: "October" },
                        { value: "11", label: "November" },
                        { value: "12", label: "December" },
                    ]}
                    value={contribution.month}
                    onChange={(e) => setContribution({ ...contribution, month: e.target.value })}

                />
                <SelectFormField
                    label="Amount"
                    options={[
                        { value: user?.monthlyContributionAmount, label: user?.monthlyContributionAmount },

                    ]}
                    value={contribution.amount}
                    onChange={(e) => setContribution({ ...contribution, amount: Number(e.target.value) })}
                   
                />
            </fieldset>
            <div className="parallel-btn">
                <Button
                    label="Cancel"
                    onClick={() => {
                        closePopup()
                        setContribution(initialContributionState)
                        setError(null)
                    }}
                        
                    className="button-secondary"
                />
                <Button
                    label="Apply"
                    onClick={handleApply}
                    className="button-primary"
                />
            </div>

        </div>
    );
}